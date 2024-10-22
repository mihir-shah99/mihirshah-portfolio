import React from 'react';
import { formatDistanceToNow } from 'date-fns'; // To format dates

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
  Vue: "#41b883", 
  Go: "#00ADD8",  
  PHP: "#4F5D95",
  AIDL: "#34B7F1", 
  TypeScript: "#3178C6"
};

const ProjectCard = React.memo(({ repo }) => {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
    >
      <div className="p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{repo.name}</h2>

        {/* Programming Languages */}
        <div className="flex flex-wrap justify-center items-center mb-4">
          {Object.keys(repo.languages).map((language) => (
            <div key={language} className="flex items-center mr-2 mb-2">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: languageColors[language] || '#cccccc' }}
              ></div>
              <span className="text-sm text-gray-600">{language}</span>
            </div>
          ))}
        </div>

        {/* Star, Fork Count */}
        <div className="flex justify-center space-x-6 mb-4">
          <div className="text-gray-600">
            ⭐ {repo.stargazers_count}
          </div>
          <div className="text-gray-600">
            🍴 {repo.forks_count}
          </div>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-500">
          Last updated: {formatDistanceToNow(new Date(repo.updated_at))} ago
        </div>
      </div>
    </a>
  );
});

export default ProjectCard;
