// functions/index.js

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
  
  /**
   * Handle incoming requests and route them appropriately.
   * This Worker handles only the `/projects` endpoint.
   */
  async function handleRequest(request) {
    const url = new URL(request.url)
    const path = url.pathname
    const method = request.method
  
    // Set CORS headers to allow your frontend to access the Worker
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'mihirshah.tech',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  
    // Handle preflight requests
    if (method === 'OPTIONS') {
      return new Response(null, {
        headers: corsHeaders,
        status: 204,
      })
    }
  
    // Only handle GET requests to /projects
    if (method !== 'GET' || path !== '/projects') {
      return new Response('Not Found', {
        status: 404,
        headers: corsHeaders,
      })
    }
  
    // Parse query parameters for pagination
    const page = url.searchParams.get('page') || '1'
    const perPage = url.searchParams.get('perPage') || '20'
  
    try {
      // Fetch user profile data from GitHub
      const profileResponse = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`, // GITHUB_TOKEN is injected via Workers Secrets
          'Accept': 'application/vnd.github.v3+json',
        },
      })
  
      // Update rate limit information from GitHub response headers
      updateRateLimit(profileResponse.headers)
  
      if (!profileResponse.ok) {
        const errorData = await profileResponse.json()
        throw new Error(`Failed to fetch user profile: ${errorData.message}`)
      }
  
      const profileData = await profileResponse.json()
  
      // Fetch repositories with pagination
      const reposResponse = await fetch(`https://api.github.com/user/repos?visibility=public&affiliation=owner&per_page=${perPage}&page=${page}`, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
        },
      })
  
      // Update rate limit information from GitHub response headers
      updateRateLimit(reposResponse.headers)
  
      if (!reposResponse.ok) {
        const errorData = await reposResponse.json()
        throw new Error(`Failed to fetch repositories: ${errorData.message}`)
      }
  
      const reposData = await reposResponse.json()
  
      // Fetch languages for each repository in parallel
      const reposWithLanguages = await Promise.all(
        reposData.map(async (repo) => {
          try {
            const languagesResponse = await fetch(repo.languages_url, {
              headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
              },
            })
  
            // Update rate limit information from GitHub response headers
            updateRateLimit(languagesResponse.headers)
  
            if (!languagesResponse.ok) {
              const langErrorData = await languagesResponse.json()
              throw new Error(`Failed to fetch languages for repo "${repo.name}": ${langErrorData.message}`)
            }
  
            const languagesData = await languagesResponse.json()
            return { ...repo, languages: languagesData }
          } catch (langError) {
            console.error(langError)
            return { ...repo, languages: {} } // Fallback to empty languages
          }
        })
      )
  
      // Calculate totalStars as the sum of stargazers_count of fetched repos
      const totalStars = reposWithLanguages.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0)
  
      // Prepare profileStats
      const profileStats = {
        followers: profileData.followers,
        publicRepos: profileData.public_repos,
        totalStars: totalStars,
      }
  
      // Prepare the final response data
      const responseData = {
        profileStats,
        repos: reposWithLanguages,
      }
  
      // Return the consolidated data
      return new Response(JSON.stringify(responseData), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
  
    } catch (error) {
      console.error('Error in Worker:', error)
      return new Response(JSON.stringify({ message: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
  }
  
  /**
   * Extract and update rate limit information from GitHub response headers.
   * This information can be used to manage frontend behavior based on API usage.
   */
  function updateRateLimit(headers) {
    const limit = parseInt(headers.get('X-RateLimit-Limit'), 10)
    const remaining = parseInt(headers.get('X-RateLimit-Remaining'), 10)
    const reset = parseInt(headers.get('X-RateLimit-Reset'), 10) * 1000 // Convert to milliseconds
  
    // Optionally, you can store or log rate limit info for analytics
    // For simplicity, we're not persisting this data in the Worker
  }
  