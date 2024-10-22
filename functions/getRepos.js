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
  
    // Fetch rate limit info to ensure we don't exceed GitHub API limits
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
  
      if (remainingRequests === 0) {
        return new Response(
          JSON.stringify({
            error: `GitHub API rate limit exceeded. Limit will reset at ${resetTime}`,
          }),
          { status: 429 } // Too Many Requests
        );
      }
  
      // Fetch both repositories and profile stats
      const [reposResponse, profileResponse] = await Promise.all([
        fetch(`${GITHUB_API_URL}/users/mihir-shah99/repos`, { headers }),
        fetch(`${GITHUB_API_URL}/users/mihir-shah99`, { headers })
      ]);
  
      if (!reposResponse.ok || !profileResponse.ok) {
        return new Response(
          JSON.stringify({
            error: `GitHub API error: ${reposResponse.status} - ${reposResponse.statusText}`,
          }),
          { status: reposResponse.status }
        );
      }
  
      const repos = await reposResponse.json();
      const profile = await profileResponse.json();
  
      // Calculate total stars from all repositories
      const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  
      // Prepare combined response with both repos and profile stats
      const combinedData = {
        repos,
        profileStats: {
          followers: profile.followers,
          publicRepos: profile.public_repos,
          totalStars,
        },
      };
  
      // Cache the response for 24 hours (86400 seconds)
      const response = new Response(JSON.stringify(combinedData), {
        headers: { 'Content-Type': 'application/json' },
      });
      response.headers.append('Cache-Control', 's-maxage=86400');
  
      // Store the response in Cloudflare's cache
      await cache.put(cacheKey, response.clone());
  
      return response;
  
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch data from GitHub' }),
        { status: 500 }
      );
    }
  }
  