export async function onRequest(context) {
    const GITHUB_TOKEN = context.env.GITHUB_TOKEN; // Access environment variable in worker
  
    const headers = {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    };
  
    try {
      const response = await fetch('https://api.github.com/users/mihir-shah99/repos', { headers });
      const repos = await response.json();
  
      return new Response(JSON.stringify(repos), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Failed to fetch repos' }), {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      });
    }
  }
  