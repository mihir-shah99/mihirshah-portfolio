export async function onRequest(context) {
    const GITHUB_TOKEN = context.env.GITHUB_TOKEN;
    const GITHUB_API_URL = 'https://api.github.com';
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      'User-Agent': 'CloudflareWorker',
    };
  
    const cache = caches.default;
    const cacheKey = new Request(context.request.url, context.request);
  
    // Check if cached response exists
    const cachedResponse = await cache.match(cacheKey);
    if (cachedResponse) {
      return cachedResponse;  // Return cached response if available
    }
  
    try {
      // Fetch GitHub profile stats
      const profileResponse = await fetch(`${GITHUB_API_URL}/users/mihir-shah99`, {
        headers,
      });
      if (!profileResponse.ok) {
        return new Response(
          JSON.stringify({
            error: `GitHub API error (profile): ${profileResponse.status} - ${profileResponse.statusText}`,
          }),
          { status: profileResponse.status }
        );
      }
      const profile = await profileResponse.json();
  
      // Fetch repositories and their languages
      const reposResponse = await fetch(`${GITHUB_API_URL}/users/mihir-shah99/repos`, {
        headers,
      });
      if (!reposResponse.ok) {
        return new Response(
          JSON.stringify({
            error: `GitHub API error (repos): ${reposResponse.status} - ${reposResponse.statusText}`,
          }),
          { status: reposResponse.status }
        );
      }
      const repos = await reposResponse.json();
  
      // Fetch all repo languages
      const reposWithLanguages = await Promise.all(
        repos.map(async (repo) => {
          const languagesResponse = await fetch(repo.languages_url, { headers });
          const languages = await languagesResponse.json();
          return { ...repo, languages };
        })
      );
  
      // Calculate total stars
      const totalStars = reposWithLanguages.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  
      // Prepare the data response
      const responseData = {
        profileStats: {
          followers: profile.followers,
          publicRepos: profile.public_repos,
          totalStars,
        },
        repositories: reposWithLanguages,
      };
  
      const response = new Response(JSON.stringify(responseData), {
        headers: { 'Content-Type': 'application/json' },
      });
  
      // Cache the response for 1 day (86400 seconds)
      response.headers.append('Cache-Control', 's-maxage=86400');
  
      // Cache the response in Cloudflare
      await cache.put(cacheKey, response.clone());
  
      return response;
  
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch data from GitHub.' }),
        { status: 500 }
      );
    }
  }
  