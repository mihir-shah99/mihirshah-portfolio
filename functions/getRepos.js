export async function onRequest(context, env) {
    const GITHUB_API_URL = 'https://api.github.com/users/mihir-shah99/repos';
    const token = env.GITHUB_TOKEN;  // Get GitHub Token from env variable
  
    try {
      const response = await fetch(GITHUB_API_URL, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      });
  
      // Check if response is okay
      if (!response.ok) {
        return new Response(
          JSON.stringify({ error: `GitHub API error: ${response.status} - ${response.statusText}` }), 
          { status: response.status }
        );
      }
  
      const repos = await response.json();
  
      return new Response(JSON.stringify(repos), {
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (error) {
      return new Response(JSON.stringify({ error: `Failed to fetch repos: ${error.message}` }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  }
  