export async function onRequest(context) {
    const GITHUB_TOKEN = context.env.GITHUB_TOKEN;
    const GITHUB_API_URL = 'https://api.github.com';
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      'User-Agent': 'CloudflareWorker',
    };
  
    // Fetch the rate limit information
    try {
      const rateLimitResponse = await fetch(`${GITHUB_API_URL}/rate_limit`, {
        headers,
      });
  
      if (!rateLimitResponse.ok) {
        return new Response(
          JSON.stringify({
            error: `GitHub API rate limit error: ${rateLimitResponse.status} - ${rateLimitResponse.statusText}`,
          }),
          { status: rateLimitResponse.status }
        );
      }
  
      const rateLimitData = await rateLimitResponse.json();
      const remainingRequests = rateLimitData.rate.remaining;
      const resetTime = new Date(rateLimitData.rate.reset * 1000).toLocaleString();
  
      // Check if rate limit is exceeded
      if (remainingRequests === 0) {
        return new Response(
          JSON.stringify({
            error: `GitHub API rate limit exceeded. Limit will reset at ${resetTime}`,
          }),
          { status: 429 } // Too Many Requests
        );
      }
  
      // Proceed to fetch repositories
      const reposResponse = await fetch(
        `${GITHUB_API_URL}/users/mihir-shah99/repos`,
        {
          headers,
        }
      );
  
      if (!reposResponse.ok) {
        return new Response(
          JSON.stringify({
            error: `GitHub API error: ${reposResponse.status} - ${reposResponse.statusText}`,
          }),
          { status: reposResponse.status }
        );
      }
  
      const repos = await reposResponse.json();
  
      return new Response(JSON.stringify(repos), {
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch repos' }),
        { status: 500 }
      );
    }
  }
  