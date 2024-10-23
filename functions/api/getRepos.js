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
    'Access-Control-Allow-Origin': '*', // Replace '*' with your frontend's origin in production for enhanced security
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

    if (!profileResponse.ok) {
      // Clone the response to read it as text without affecting the original response
      const clonedProfileResponse = profileResponse.clone();
      let errorData;
      try {
        errorData = await clonedProfileResponse.json();
        console.error('Error fetching user profile:', errorData.message);
        throw new Error(`Failed to fetch user profile: ${errorData.message}`);
      } catch (jsonError) {
        const responseText = await clonedProfileResponse.text();
        console.error('Failed to parse profile error response as JSON:', responseText);
        throw new Error(`Failed to fetch user profile: ${profileResponse.statusText}`);
      }
    }

    // Attempt to parse profile JSON
    let profileData;
    try {
      profileData = await profileResponse.json();
      console.log('Fetched Profile Data:', profileData);
    } catch (jsonError) {
      const responseText = await profileResponse.text();
      console.error('Failed to parse profile response as JSON:', responseText);
      throw new Error(`Invalid JSON in profile response: ${jsonError.message}`);
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

    if (!reposResponse.ok) {
      // Clone the response to read it as text without affecting the original response
      const clonedReposResponse = reposResponse.clone();
      let errorData;
      try {
        errorData = await clonedReposResponse.json();
        console.error('Error fetching repositories:', errorData.message);
        throw new Error(`Failed to fetch repositories: ${errorData.message}`);
      } catch (jsonError) {
        const responseText = await clonedReposResponse.text();
        console.error('Failed to parse repositories error response as JSON:', responseText);
        throw new Error(`Failed to fetch repositories: ${reposResponse.statusText}`);
      }
    }

    // Attempt to parse repos JSON
    let reposData;
    try {
      reposData = await reposResponse.json();
      console.log('Fetched Repositories:', reposData);
    } catch (jsonError) {
      const responseText = await reposResponse.text();
      console.error('Failed to parse repositories response as JSON:', responseText);
      throw new Error(`Invalid JSON in repositories response: ${jsonError.message}`);
    }

    // Fetch languages for each repository in parallel
    console.log('Fetching languages for each repository');
    const reposWithLanguages = await Promise.all(
      reposData.map(async (repo) => {
        try {
          const languagesResponse = await fetch(repo.languages_url, {
            headers: {
              'Authorization': `token ${GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          });

          const languagesRateLimit = extractRateLimit(languagesResponse.headers);
          console.log(`Languages Rate Limit for ${repo.name}:`, languagesRateLimit);

          if (!languagesResponse.ok) {
            // Clone the response to read it as text without affecting the original response
            const clonedLanguagesResponse = languagesResponse.clone();
            let langErrorData;
            try {
              langErrorData = await clonedLanguagesResponse.json();
              console.error(`Error fetching languages for repo "${repo.name}":`, langErrorData.message);
              throw new Error(`Failed to fetch languages for repo "${repo.name}": ${langErrorData.message}`);
            } catch (jsonError) {
              const responseText = await clonedLanguagesResponse.text();
              console.error(`Failed to parse languages error response for repo "${repo.name}" as JSON:`, responseText);
              throw new Error(`Failed to fetch languages for repo "${repo.name}": ${languagesResponse.statusText}`);
            }
          }

          // Attempt to parse languages JSON
          let languagesData;
          try {
            languagesData = await languagesResponse.json();
            console.log(`Fetched Languages for ${repo.name}:`, languagesData);
          } catch (jsonError) {
            const responseText = await languagesResponse.text();
            console.error(`Failed to parse languages response for repo "${repo.name}" as JSON:`, responseText);
            throw new Error(`Invalid JSON in languages response for repo "${repo.name}": ${jsonError.message}`);
          }

          return { ...repo, languages: languagesData };
        } catch (langError) {
          console.error(langError);
          return { ...repo, languages: {} }; // Fallback to empty languages
        }
      })
    );

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
