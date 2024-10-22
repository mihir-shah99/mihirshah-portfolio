export async function onRequest(context) {
    const token = context.env.GITHUB_TOKEN;
    const GITHUB_API_URL = 'https://api.github.com/users/mihir-shah99/repos';
  
    // Check if the token is available
    if (!token) {
      return new Response(JSON.stringify({ error: "Missing GitHub token" }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  
    try {
      // Step 1: Check GitHub API Rate Limit
      const rateLimitResponse = await fetch('https://api.github.com/rate_limit', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (!rateLimitResponse.ok) {
        return new Response(
          JSON.stringify({ error: `GitHub API rate limit error: ${rateLimitResponse.status} - ${rateLimitResponse.statusText}` }),
          { status: rateLimitResponse.status }
        );
      }
  
      const rateLimitData = await rateLimitResponse.json();
      const remainingRequests = rateLimitData.resources.core.remaining;
  
      // Log rate limit data to Cloudflare logs (useful for debugging)
      console.log('GitHub API Rate Limit:', rateLimitData);
  
      // If we have hit the rate limit, return the rate limit data
      if (remainingRequests === 0) {
        return new Response(
          JSON.stringify({ error: 'GitHub API rate limit exceeded', rateLimitData }),
          { headers: { 'Content-Type': 'application/json' }, status: 429 }
        );
      }
  
      // Step 2: Fetch repositories with languages if rate limit allows
      const repoResponse = await fetch(GITHUB_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });
  
      if (!repoResponse.ok) {
        return new Response(
          JSON.stringify({ error: `GitHub API error: ${repoResponse.status} - ${repoResponse.statusText}` }),
          { status: repoResponse.status }
        );
      }
  
      const repos = await repoResponse.json();
  
      // Step 3: Fetch languages for each repository
      const reposWithLanguages = await Promise.all(
        repos.map(async (repo) => {
          const languagesResponse = await fetch(repo.languages_url, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/vnd.github.v3+json',
            },
          });
          const languages = await languagesResponse.json();
          return { ...repo, languages };
        })
      );
  
      // Step 4: Return repository data
      return new Response(JSON.stringify(reposWithLanguages), {
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (error) {
      // Catch any errors and return a failure response
      return new Response(JSON.stringify({ error: `Failed to fetch repos: ${error.message}` }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  }
  