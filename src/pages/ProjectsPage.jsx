import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { FaStar, FaCodeBranch, FaGithub, FaUsers } from 'react-icons/fa';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ProjectCard from './ProjectCard';

// GitHub access token (hardcoded)
const GITHUB_TOKEN = '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';

// Helper function to fetch repositories and their languages from GitHub API
const fetchReposAndLanguages = async (page = 1, perPage = 10) => {
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };

  const repoResponse = await fetch(
    `https://api.github.com/users/mihir-shah99/repos?page=${page}&per_page=${perPage}`,
    { headers }
  );
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

// Helper function to fetch GitHub profile stats
const fetchProfileStats = async () => {
  const headers = {
    Authorization: `token ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
  };

  const profileResponse = await fetch('https://api.github.com/users/mihir-shah99', {
    headers,
  });
  const profile = await profileResponse.json();

  // Fetch all repos to calculate total stars
  const reposResponse = await fetch('https://api.github.com/users/mihir-shah99/repos', {
    headers,
  });
  const repos = await reposResponse.json();
  const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

  return {
    followers: profile.followers,
    publicRepos: profile.public_repos,
    totalStars,
  };
};

// Define featured project names manually
const featuredProjectsNames = ['touch2fa', 'VulnDroid', 'Learning-Linux'];

const ProjectsPage = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // To track if more repos are available
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [profileStats, setProfileStats] = useState({ followers: 0, publicRepos: 0, totalStars: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const repositories = await fetchReposAndLanguages(page, 10);
      setRepos((prevRepos) => [...prevRepos, ...repositories]);

      // Extract unique languages from all repositories
      const languages = new Set();
      repositories.forEach((repo) => {
        Object.keys(repo.languages).forEach((lang) => languages.add(lang));
      });
      setAvailableLanguages([...languages]);

      if (repositories.length < 10) {
        setHasMore(false); // No more repos to load
      }
      setLoading(false);
    };

    const fetchProfileStatsAndSet = async () => {
      const stats = await fetchProfileStats();
      setProfileStats(stats);
    };

    fetchProfileStatsAndSet();
    fetchData();
  }, [page]);

  // Function to handle search input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Function to handle language filter
  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  // Function to load more repos when clicking "Load More"
  const loadMoreRepos = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // Filter repositories based on search and language
  const filteredRepos = repos.filter((repo) => {
    const matchesSearch =
      repo.name.toLowerCase().includes(searchQuery) ||
      (repo.description && repo.description.toLowerCase().includes(searchQuery));
    const matchesLanguage =
      selectedLanguage === '' || Object.keys(repo.languages).includes(selectedLanguage);
    return matchesSearch && matchesLanguage;
  });

  // Separate featured projects and regular projects
  const featuredRepos = filteredRepos.filter((repo) =>
    featuredProjectsNames.includes(repo.name)
  );
  const regularRepos = filteredRepos.filter(
    (repo) => !featuredProjectsNames.includes(repo.name)
  );

  // Slick carousel settings for mobile
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="container mx-auto py-20 px-4">
      {/* GitHub Overview Section */}
      <section className="bg-gray-900 text-white py-12 px-6 rounded-lg mb-12">
        <h2 className="text-3xl font-bold text-center mb-6">GitHub Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Stats */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <FaGithub className="mr-2" /> GitHub Stats
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaStar className="text-yellow-400 mr-2" />
                Total Stars: <strong>{profileStats.totalStars}</strong>
              </li>
              <li className="flex items-center">
                <FaCodeBranch className="text-green-400 mr-2" />
                Total Repositories: <strong>{profileStats.publicRepos}</strong>
              </li>
              <li className="flex items-center">
                <FaUsers className="text-blue-400 mr-2" />
                Followers: <strong>{profileStats.followers}</strong>
              </li>
            </ul>
          </div>

          {/* Circular Progress for Contribution Score */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-4">Contribution Score</h3>
            <div className="w-32 mx-auto">
              <CircularProgressbar
                value={75} // Replace with actual contribution score
                text={'B-'}
                styles={buildStyles({
                  textColor: '#fff',
                  pathColor: '#f06292',
                  trailColor: '#d6d6d6',
                })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <h1 className="text-4xl font-bold mb-8 text-center">Highlighted Projects</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          placeholder="Search for projects..."
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg"
          value={searchQuery}
          onChange={handleSearchChange}
        />

        <select
          className="w-full md:w-1/3 p-2 border border-gray-300 rounded-lg"
          value={selectedLanguage}
          onChange={handleLanguageChange}
        >
          <option value="">Filter by Language</option>
          {availableLanguages.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-xl">Loading projects...</p>
      ) : (
        <>
          {/* Featured Projects Section */}
          {featuredRepos.length > 0 && (
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-6">Featured Projects</h2>

              {/* Carousel for Mobile View */}
              <div className="block md:hidden">
                <Slider {...sliderSettings}>
                  {featuredRepos.map((repo) => (
                    <div key={repo.id} className="p-4">
                      <ProjectCard repo={repo} />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Grid for Desktop View */}
              <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-8">
                {featuredRepos.map((repo) => (
                  <ProjectCard key={repo.id} repo={repo} />
                ))}
              </div>
            </div>
          )}

          {/* Regular Projects Section */}
          <h2 className="text-3xl font-bold text-center mb-6">Other Projects</h2>

          {/* Carousel for Mobile */}
          <div className="block md:hidden">
            <Slider {...sliderSettings}>
              {regularRepos.map((repo) => (
                <div key={repo.id} className="p-4">
                  <ProjectCard repo={repo} />
                </div>
              ))}
            </Slider>
          </div>

          {/* Grid for Desktop */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {regularRepos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                className="bg-blue-500 text-white p-4 rounded"
                onClick={loadMoreRepos}
              >
                {loading ? 'Loading more projects...' : 'Load More Projects'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProjectsPage;
