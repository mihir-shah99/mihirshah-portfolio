export async function onRequest(context) {
    // Access the environment variable
    console.log("GITHUB_TOKEN:", context.env.GITHUB_TOKEN);
    const token = context.env.GITHUB_TOKEN; // Fetch the GitHub token from env variables
    
    if (!token) {
      return new Response(JSON.stringify({ error: "Missing GitHub token" }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  
    const GITHUB_API_URL = 'https://api.github.com/users/mihir-shah99/repos';
  
    try {
      const response = await fetch(GITHUB_API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`,  // Use the token from environment
          'Accept': 'application/vnd.github.v3+json',
        },
      });
  
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
  