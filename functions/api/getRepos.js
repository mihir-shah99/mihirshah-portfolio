// functions/api/getRepos.js

/**
 * Cloudflare Pages Function to fetch GitHub profile stats and repositories.
 * 
 * @param {object} context - The context object containing request and environment variables.
 * @returns {Response} - The response containing profile stats and repositories.
 */
export async function onRequestGet({ request, env }) {
  console.log('Worker invoked');
  console.log('Request Method:', request.method);

  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': 'https://mihirshah.tech', // Replace '*' with your frontend's origin in production for enhanced security
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    const GITHUB_TOKEN = env.GITHUB_TOKEN;

    // Logging to verify if GITHUB_TOKEN is accessible
    console.log('GITHUB_TOKEN:', GITHUB_TOKEN ? 'Set' : 'Not Set');

    if (!GITHUB_TOKEN) {
      console.error('GITHUB_TOKEN is not set');
      return new Response(JSON.stringify({ message: 'GitHub token not configured.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Helper function to extract rate limit information
    const extractRateLimit = (headers) => {
      const limit = parseInt(headers.get('X-RateLimit-Limit'), 10) || null;
      const remaining = parseInt(headers.get('X-RateLimit-Remaining'), 10) || null;
      const reset = parseInt(headers.get('X-RateLimit-Reset'), 10) * 1000 || null; // Convert to milliseconds
      return { limit, remaining, reset };
    };

    // Helper function to fetch and parse JSON with proper error handling
    const fetchAndParseJSON = async (url, options, contextDescription) => {
      const response = await fetch(url, options);
      const rateLimit = extractRateLimit(response.headers);

      if (!response.ok) {
        // Clone the response to read it as text without affecting the original response
        const clonedResponse = response.clone();
        let errorMessage = `Failed to fetch ${contextDescription}: ${response.statusText}`;

        try {
          const errorData = await clonedResponse.json();
          if (errorData && errorData.message) {
            errorMessage = `Failed to fetch ${contextDescription}: ${errorData.message}`;
          }
        } catch (jsonError) {
          const responseText = await clonedResponse.text();
          console.error(`Failed to parse error response for ${contextDescription}:`, responseText);
        }

        throw new Error(errorMessage);
      }

      try {
        const data = await response.json();
        return { data, rateLimit };
      } catch (jsonError) {
        const responseText = await response.text();
        console.error(`Failed to parse JSON for ${contextDescription}:`, responseText);
        throw new Error(`Invalid JSON response for ${contextDescription}: ${jsonError.message}`);
      }
    };

    // Fetch user profile
    console.log('Fetching user profile');
    const profileURL = 'https://api.github.com/user';
    const profileOptions = {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    };

    const { data: profileData, rateLimit: profileRateLimit } = await fetchAndParseJSON(profileURL, profileOptions, 'user profile');

    console.log('Profile Rate Limit:', profileRateLimit);
    console.log('Fetched Profile Data:', profileData);

    // Fetch repositories with pagination
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const perPage = url.searchParams.get('perPage') || '20';

    console.log(`Fetching repositories: page=${page}, perPage=${perPage}`);
    const reposURL = `https://api.github.com/user/repos?visibility=public&affiliation=owner&per_page=${perPage}&page=${page}`;
    const reposOptions = {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    };

    const { data: reposData, rateLimit: reposRateLimit } = await fetchAndParseJSON(reposURL, reposOptions, 'repositories');

    console.log('Repositories Rate Limit:', reposRateLimit);
    console.log('Fetched Repositories:', reposData);

    // Fetch languages for each repository with controlled concurrency
    console.log('Fetching languages for each repository');
    const concurrencyLimit = 5; // Adjust based on rate limits and performance
    const reposWithLanguages = [];
    const queue = [...reposData]; // Clone the array to prevent mutation

    // Helper function to process a single repository's languages
    const processRepoLanguages = async (repo) => {
      try {
        const languagesURL = repo.languages_url;
        const languagesOptions = {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        };

        const { data: languagesData, rateLimit: languagesRateLimit } = await fetchAndParseJSON(languagesURL, languagesOptions, `languages for repo "${repo.name}"`);

        console.log(`Languages Rate Limit for ${repo.name}:`, languagesRateLimit);
        console.log(`Fetched Languages for ${repo.name}:`, languagesData);

        return { ...repo, languages: languagesData };
      } catch (error) {
        console.error(error.message);
        return { ...repo, languages: {} }; // Fallback to empty languages
      }
    };

    // Helper function to process the queue with limited concurrency
    const processQueue = async () => {
      while (queue.length > 0) {
        const currentBatch = queue.splice(0, concurrencyLimit);
        const batchPromises = currentBatch.map((repo) => processRepoLanguages(repo));
        const batchResults = await Promise.all(batchPromises);
        reposWithLanguages.push(...batchResults);
      }
    };

    await processQueue();

    // Calculate totalStars as the sum of stargazers_count of fetched repos
    const totalStars = reposWithLanguages.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
    console.log('Total Stars:', totalStars);

    // Prepare profileStats
    const profileStats = {
      followers: profileData.followers,
      publicRepos: profileData.public_repos,
      totalStars: totalStars,
    };

    // Prepare the final response data
    const responseData = {
      profileStats,
      repos: reposWithLanguages,
      rateLimit: {
        limit: reposRateLimit.limit || profileRateLimit.limit,
        remaining: reposRateLimit.remaining || profileRateLimit.remaining,
        reset: reposRateLimit.reset || profileRateLimit.reset,
      },
    };

    console.log('Response Data:', responseData);

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in getRepos Function:', error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
}
