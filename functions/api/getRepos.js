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

    // Function to extract rate limit information
    const extractRateLimit = (headers) => {
      const limit = parseInt(headers.get('X-RateLimit-Limit'), 10) || null;
      const remaining = parseInt(headers.get('X-RateLimit-Remaining'), 10) || null;
      const reset = parseInt(headers.get('X-RateLimit-Reset'), 10) * 1000 || null; // Convert to milliseconds
      return { limit, remaining, reset };
    };

    // Fetch user profile
    console.log('Fetching user profile');
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const profileRateLimit = extractRateLimit(profileResponse.headers);
    console.log('Profile Rate Limit:', profileRateLimit);

    let profileData;
    if (profileResponse.ok) {
      profileData = await profileResponse.json();
      console.log('Fetched Profile Data:', profileData);
    } else {
      const errorData = await profileResponse.json().catch(() => null);
      const errorMessage = errorData?.message || 'Failed to fetch user profile.';
      console.error('Error fetching user profile:', errorMessage);
      throw new Error(errorMessage);
    }

    // Fetch repositories with pagination
    const url = new URL(request.url);
    const page = url.searchParams.get('page') || '1';
    const perPage = url.searchParams.get('perPage') || '20';

    console.log(`Fetching repositories: page=${page}, perPage=${perPage}`);
    const reposResponse = await fetch(`https://api.github.com/user/repos?visibility=public&affiliation=owner&per_page=${perPage}&page=${page}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const reposRateLimit = extractRateLimit(reposResponse.headers);
    console.log('Repositories Rate Limit:', reposRateLimit);

    let reposData;
    if (reposResponse.ok) {
      reposData = await reposResponse.json();
      console.log('Fetched Repositories:', reposData);
    } else {
      const errorData = await reposResponse.json().catch(() => null);
      const errorMessage = errorData?.message || 'Failed to fetch repositories.';
      console.error('Error fetching repositories:', errorMessage);
      throw new Error(errorMessage);
    }

    // Fetch languages for each repository in parallel with limited concurrency
    console.log('Fetching languages for each repository');
    const concurrencyLimit = 5; // Adjust based on rate limits and performance
    const reposWithLanguages = [];
    const queue = [...reposData]; // Clone the array to prevent mutation

    // Helper function to process the queue with limited concurrency
    const processQueue = async () => {
      while (queue.length > 0) {
        const currentBatch = queue.splice(0, concurrencyLimit);
        const batchPromises = currentBatch.map(async (repo) => {
          try {
            const languagesResponse = await fetch(repo.languages_url, {
              headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
              },
            });

            const languagesRateLimit = extractRateLimit(languagesResponse.headers);
            console.log(`Languages Rate Limit for ${repo.name}:`, languagesRateLimit);

            let languagesData;
            if (languagesResponse.ok) {
              languagesData = await languagesResponse.json();
              console.log(`Fetched Languages for ${repo.name}:`, languagesData);
            } else {
              const errorData = await languagesResponse.json().catch(() => null);
              const errorMessage = errorData?.message || `Failed to fetch languages for repo "${repo.name}".`;
              console.error(`Error fetching languages for repo "${repo.name}":`, errorMessage);
              throw new Error(errorMessage);
            }

            return { ...repo, languages: languagesData };
          } catch (langError) {
            console.error(langError);
            return { ...repo, languages: {} }; // Fallback to empty languages
          }
        });

        const results = await Promise.all(batchPromises);
        reposWithLanguages.push(...results);
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