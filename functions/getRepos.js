export async function onRequest(context) {
    const GITHUB_TOKEN = context.env.GITHUB_TOKEN;
    const GITHUB_API_URL = 'https://api.github.com';
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      'User-Agent': 'CloudflareWorker',
    };
  
    const cache = caches.default;  // Cloudflare default cache
  
    // Cache key based on the URL
    const cacheKey = new Request(context.request.url, context.request);
  
    // Check if the response is already in the cache
    let cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;  // Return cached response if available
    }
  
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
  
      // Cache the response
      const response = new Response(JSON.stringify(repos), {
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Cache the response for 5 minutes (300 seconds)
      response.headers.append('Cache-Control', 's-maxage=86400');
  
      // Store the response in Cloudflare's cache
      await cache.put(cacheKey, response.clone());
  
      return response;
  
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch repos' }),
        { status: 500 }
      );
    }
  }
  