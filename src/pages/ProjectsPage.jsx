import React, { useEffect, useState } from 'react';

// Helper function to fetch repositories and their languages from GitHub
const fetchReposAndLanguages = async () => {
  const token = process.env.REACT_APP_GITHUB_TOKEN;  // Access the token from the environment variable
  
  const headers = {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github.v3+json',
  };

  const repoResponse = await fetch('https://api.github.com/users/mihir-shah99/repos', {
    headers,
  });

  const repos = await repoResponse.json();

  // For each repo, fetch the languages used
  const reposWithLanguages = await Promise.all(
    repos.map(async (repo) => {
      const languagesResponse = await fetch(repo.languages_url, { headers });
      const languages = await languagesResponse.json();
      return { ...repo, languages };
    })
  );

  return reposWithLanguages;
};



// Mapping popular languages to colors
const languageColors = {
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Dockerfile: '#384d54',
  Kubernetes: '#326ce5',
  // Add more languages or frameworks here with their associated colors
};

const ProjectsPage = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReposAndSet = async () => {
      const repositories = await fetchReposAndLanguages();
      setRepos(repositories);
      setLoading(false);
    };

    fetchReposAndSet();
  }, []);

  return (
    <div className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">Highlighted Projects</h1>
      {loading ? (
        <p className="text-center text-xl">Loading projects...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {repos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
            >
              <div className="p-6">
                {/* Repository Name */}
                <h2 className="text-xl font-bold text-center text-gray-800 mb-4">{repo.name}</h2>
                
                {/* Programming Languages */}
                <div className="flex flex-wrap justify-center items-center mb-4">
                  {Object.keys(repo.languages).map((language) => (
                    <div key={language} className="flex items-center mr-2 mb-2">
                      {/* Color dot for the language */}
                      <div
                        className="w-4 h-4 rounded-full mr-2"
                        style={{ backgroundColor: languageColors[language] || '#cccccc' }} // Default gray if not mapped
                      ></div>
                      {/* Language name */}
                      <span className="text-sm text-gray-600">{language}</span>
                    </div>
                  ))}
                </div>

                {/* View Repository Button */}
                <div className="text-center">
                  <span className="text-blue-500 hover:text-blue-700">View Repository &rarr;</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
