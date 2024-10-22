export default {
    async fetch(request, env) {
      const url = new URL(request.url);
  
      // Check the route path
      if (url.pathname.startsWith("/getRepos")) {
        // Call the handler for fetching repos
        return handleGetRepos(request, env);
      } else if (url.pathname.startsWith("/getProfileStats")) {
        // Call the handler for fetching profile stats
        return handleGetProfileStats(request, env);
      } else {
        return new Response("Not Found", { status: 404 });
      }
    }
  };
  
  // Handler function for /getRepos
  async function handleGetRepos(request, env) {
    const GITHUB_TOKEN = env.GITHUB_TOKEN;
  
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || 1;
    const perPage = url.searchParams.get("per_page") || 10;
  
    const response = await fetch(`https://api.github.com/user/repos?page=${page}&per_page=${perPage}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
  
    if (!response.ok) {
      const message = await response.text();
      return new Response(JSON.stringify({ error: `GitHub API error: ${response.status} - ${message}` }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    const repos = await response.json();
    return new Response(JSON.stringify(repos), { headers: { 'Content-Type': 'application/json' } });
  }
  
  // Handler function for /getProfileStats
  async function handleGetProfileStats(request, env) {
    const GITHUB_TOKEN = env.GITHUB_TOKEN;
  
    const profileResponse = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
  
    if (!profileResponse.ok) {
      const message = await profileResponse.text();
      return new Response(JSON.stringify({ error: `GitHub API error: ${profileResponse.status} - ${message}` }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    const profile = await profileResponse.json();
  
    // Fetch all repositories to calculate total stars
    const reposResponse = await fetch('https://api.github.com/user/repos', {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
  
    if (!reposResponse.ok) {
      const message = await reposResponse.text();
      return new Response(JSON.stringify({ error: `GitHub API error: ${reposResponse.status} - ${message}` }), {
        headers: { 'Content-Type': 'application/json' },
      });
    }
  
    const repos = await reposResponse.json();
    const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  
    const stats = {
      followers: profile.followers,
      publicRepos: profile.public_repos,
      totalStars,
    };
  
    return new Response(JSON.stringify(stats), { headers: { 'Content-Type': 'application/json' } });
  }
  