export default {
    async fetch(request, env) {
      const GITHUB_API_URL = "https://api.github.com/users/mihir-shah99";
  
      try {
        // Fetch profile stats from GitHub API
        const response = await fetch(GITHUB_API_URL, {
          headers: {
            'Authorization': `token ${env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });
  
        if (!response.ok) {
          return new Response(
            JSON.stringify({ error: `GitHub API error: ${response.status} - ${response.statusText}` }),
            { status: response.status }
          );
        }
  
        const profile = await response.json();
  
        // Fetch all repos to calculate total stars
        const reposResponse = await fetch(`${GITHUB_API_URL}/repos`, {
          headers: {
            'Authorization': `token ${env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        });
  
        if (!reposResponse.ok) {
          return new Response(
            JSON.stringify({ error: `GitHub API error: ${reposResponse.status} - ${reposResponse.statusText}` }),
            { status: reposResponse.status }
          );
        }
  
        const repos = await reposResponse.json();
        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
  
        // Return the GitHub profile stats
        return new Response(
          JSON.stringify({
            followers: profile.followers,
            publicRepos: profile.public_repos,
            totalStars,
          }),
          { status: 200 }
        );
  
      } catch (error) {
        return new Response(
          JSON.stringify({ error: `Failed to fetch profile stats: ${error.message}` }),
          { status: 500 }
        );
      }
    },
  };
  