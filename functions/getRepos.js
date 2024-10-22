export async function onRequest(context) {
    const GITHUB_TOKEN = context.env.GITHUB_TOKEN;
    const GITHUB_API_URL = 'https://api.github.com';
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      'User-Agent': 'CloudflareWorker',
    };
  
    const cache = caches.default;  // Cloudflare default cache
    const cacheKey = new Request(context.request.url, context.request);
  
    let cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }
  
    try {
      // Fetch GitHub rate limits to ensure we are not hitting the limit
      const rateLimitResponse = await fetch(`${GITHUB_API_URL}/rate_limit`, { headers });
      if (!rateLimitResponse.ok) {
        return new Response(
          JSON.stringify({ error: `GitHub API rate limit error: ${rateLimitResponse.status} - ${rateLimitResponse.statusText}` }),
          { status: rateLimitResponse.status }
        );
      }
  
      const rateLimitData = await rateLimitResponse.json();
      if (rateLimitData.rate.remaining === 0) {
        const resetTime = new Date(rateLimitData.rate.reset * 1000).toLocaleString();
        return new Response(
          JSON.stringify({ error: `GitHub API rate limit exceeded. Limit will reset at ${resetTime}` }),
          { status: 429 }
        );
      }
  
      // Fetch both repositories and profile stats simultaneously
      const [reposResponse, profileResponse] = await Promise.all([
        fetch(`${GITHUB_API_URL}/users/mihir-shah99/repos`, { headers }),
        fetch(`${GITHUB_API_URL}/users/mihir-shah99`, { headers })
      ]);
  
      if (!reposResponse.ok || !profileResponse.ok) {
        return new Response(
          JSON.stringify({ error: `GitHub API error: ${reposResponse.status} - ${reposResponse.statusText}` }),
          { status: reposResponse.status }
        );
      }
  
      const repos = await reposResponse.json();
      const profile = await profileResponse.json();
  
      const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  
      const combinedData = {
        repos,
        profileStats: {
          followers: profile.followers,
          publicRepos: profile.public_repos,
          totalStars,
        },
      };
  
      const response = new Response(JSON.stringify(combinedData), {
        headers: { 'Content-Type': 'application/json' },
      });
      response.headers.append('Cache-Control', 's-maxage=86400');
      await cache.put(cacheKey, response.clone());
  
      return response;
  
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch data from GitHub' }),
        { status: 500 }
      );
    }
  }
  