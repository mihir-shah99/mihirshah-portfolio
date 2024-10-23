// functions/getRepos.js

/**
 * Cloudflare Pages Function to fetch GitHub profile stats and repositories.
 * 
 * @param {Request} request - The incoming request object.
 * @param {Object} context - The context object containing environment variables.
 * @returns {Response} - The response containing profile stats and repositories.
 */
export async function onRequestGet(context) {
  // Set CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*', // Replace '*' with your frontend's origin in production for enhanced security
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // Handle preflight OPTIONS request
  if (context.request.method === 'OPTIONS') {
    return new Response(null, {
      headers: corsHeaders,
      status: 204,
    });
  }

  try {
    const GITHUB_TOKEN = context.env.GITHUB_TOKEN;

    if (!GITHUB_TOKEN) {
      return new Response(JSON.stringify({ message: 'GitHub token not configured.' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Function to update rate limit information
    const updateRateLimit = (headers) => {
      const limit = parseInt(headers.get('X-RateLimit-Limit'), 10) || null;
      const remaining = parseInt(headers.get('X-RateLimit-Remaining'), 10) || null;
      const reset = parseInt(headers.get('X-RateLimit-Reset'), 10) * 1000 || null; // Convert to milliseconds
      return { limit, remaining, reset };
    };

    // Fetch user profile
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const profileRateLimit = updateRateLimit(profileResponse.headers);

    if (!profileResponse.ok) {
      const errorData = await profileResponse.json();
      throw new Error(`Failed to fetch user profile: ${errorData.message}`);
    }

    const profileData = await profileResponse.json();

    // Fetch repositories with pagination
    const url = new URL(context.request.url);
    const page = url.searchParams.get('page') || '1';
    const perPage = url.searchParams.get('perPage') || '20';

    const reposResponse = await fetch(`https://api.github.com/user/repos?visibility=public&affiliation=owner&per_page=${perPage}&page=${page}`, {
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });

    const reposRateLimit = updateRateLimit(reposResponse.headers);

    if (!reposResponse.ok) {
      const errorData = await reposResponse.json();
      throw new Error(`Failed to fetch repositories: ${errorData.message}`);
    }

    const reposData = await reposResponse.json();

    // Fetch languages for each repository in parallel
    const reposWithLanguages = await Promise.all(
      reposData.map(async (repo) => {
        try {
          const languagesResponse = await fetch(repo.languages_url, {
            headers: {
              'Authorization': `token ${GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          });

          const languagesRateLimit = updateRateLimit(languagesResponse.headers);

          if (!languagesResponse.ok) {
            const langErrorData = await languagesResponse.json();
            throw new Error(`Failed to fetch languages for repo "${repo.name}": ${langErrorData.message}`);
          }

          const languagesData = await languagesResponse.json();
          return { ...repo, languages: languagesData };
        } catch (langError) {
          console.error(langError);
          return { ...repo, languages: {} }; // Fallback to empty languages
        }
      })
    );

    // Calculate totalStars as the sum of stargazers_count of fetched repos
    const totalStars = reposWithLanguages.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);

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
