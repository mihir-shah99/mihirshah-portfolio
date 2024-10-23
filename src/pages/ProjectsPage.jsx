// src/pages/ProjectsPage.jsx
import React, { useEffect, useState, useMemo, useCallback, useRef, Suspense } from 'react';
import Slider from 'react-slick'; // Import the carousel slider
import {
  FaStar,
  FaCodeBranch,
  FaGithub,
  FaUsers,
} from 'react-icons/fa'; // Icons for GitHub stats
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// Lazy load the ProjectCard component
const ProjectCard = React.lazy(() => import('../components/ProjectCard')); // Adjust the path as necessary

// Import CSS for react-slick
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  const [profileStats, setProfileStats] = useState({
    followers: 0,
    publicRepos: 0,
    totalStars: 0,
  });
  const [error, setError] = useState(null); // To handle errors

  // Rate limit state
  const [rateLimit, setRateLimit] = useState({
    limit: 5000,       // Default for authenticated requests
    remaining: 5000,
    reset: null,       // Timestamp when rate limit resets
  });

  // Backoff state
  const [isBackoff, setIsBackoff] = useState(false);

  // Define thresholds and delays
  const RATE_LIMIT_THRESHOLD = 100;
  const BACKOFF_THRESHOLD = 200;
  const BACKOFF_DELAY = 30000; // 30 seconds

  // In-memory cache using useRef
  const cache = useRef({
    profileStats: null,
    repos: {},
  });

  // Define the Cloudflare Worker base URL from environment variables
  const WORKER_BASE_URL = import.meta.env.VITE_WORKER_URL; // Ensure this is set in your .env file

  // Helper function to update rate limit state
  const updateRateLimit = useCallback((headers) => {
    const limit = parseInt(headers.get('X-RateLimit-Limit'), 10)
    const remaining = parseInt(headers.get('X-RateLimit-Remaining'), 10)
    const reset = parseInt(headers.get('X-RateLimit-Reset'), 10) * 1000 // Convert to milliseconds
    setRateLimit({ limit, remaining, reset })
  }, [])

  /**
   * Fetches data from the Cloudflare Worker.
   * @param {number} pageNumber - The current page number for pagination.
   * @param {number} perPage - Number of repositories per page.
   * @returns {object|null} - Returns the fetched data or null in case of an error.
   */
  const fetchProjectsData = useCallback(async (pageNumber = 1, perPage = 20) => {
    try {
      const cacheKey = `page_${pageNumber}_perPage_${perPage}`
      // Check if data is in cache
      if (cache.current.repos[cacheKey]) {
        return cache.current.repos[cacheKey]
      }

      // Construct the Worker URL with query parameters
      const url = `${WORKER_BASE_URL}?page=${pageNumber}&perPage=${perPage}`

      const response = await fetch(url)

      // Update rate limit based on response headers
      updateRateLimit(response.headers)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Failed to fetch data: ${errorData.message}`)
      }

      const data = await response.json()

      // Cache the fetched repos
      cache.current.repos[cacheKey] = data

      return data
    } catch (err) {
      console.error(err)
      setError(err.message)
      return null
    }
  }, [WORKER_BASE_URL, updateRateLimit])

  /**
   * Fetches and sets GitHub profile stats and repositories.
   */
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const data = await fetchProjectsData(page, 20) // perPage = 20

        if (!data) {
          setLoading(false)
          return
        }

        const { profileStats: fetchedProfileStats, repos: fetchedRepos } = data

        // Set profileStats if not already set
        if (!cache.current.profileStats) {
          setProfileStats(fetchedProfileStats)
          cache.current.profileStats = fetchedProfileStats
        }

        // Append new repos, avoiding duplicates based on repo id
        setRepos((prevRepos) => {
          const existingRepoIds = new Set(prevRepos.map((repo) => repo.id))
          const newRepos = fetchedRepos.filter((repo) => !existingRepoIds.has(repo.id))
          return [...prevRepos, ...newRepos]
        })

        // Extract unique languages from fetched repositories
        const languages = new Set()
        fetchedRepos.forEach((repo) => {
          if (repo.languages) {
            Object.keys(repo.languages).forEach((lang) => languages.add(lang))
          }
        })

        setAvailableLanguages((prevLanguages) => {
          const updatedLanguages = new Set([...prevLanguages, ...languages])
          return Array.from(updatedLanguages).sort() // Sort alphabetically
        })

        // Determine if more repos are available
        if (fetchedRepos.length < 20) { // Adjusted to match perPage
          setHasMore(false) // No more repos to load
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('An error occurred while fetching data.')
      } finally {
        setLoading(false)
      }
    }

    // Before fetching data, check if rate limit is exceeded
    if (rateLimit.remaining === 0) {
      const now = Date.now()
      if (rateLimit.reset && now < rateLimit.reset) {
        const timeUntilResetMs = rateLimit.reset - now
        const minutes = Math.floor(timeUntilResetMs / 60000)
        const seconds = Math.floor((timeUntilResetMs % 60000) / 1000)
        setError(`GitHub API rate limit exceeded. Please try again in ${minutes}m ${seconds}s.`)
        setLoading(false)
        return
      } else {
        // Reset the rate limit if the reset time has passed
        setRateLimit((prev) => ({ ...prev, remaining: prev.limit }))
      }
    }

    fetchData()
  }, [page, rateLimit.remaining, rateLimit.reset, fetchProjectsData])

  // Function to handle search input
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value.toLowerCase())
  }, [])

  // Function to handle language filter
  const handleLanguageChange = useCallback((e) => {
    setSelectedLanguage(e.target.value)
  }, [])

  /**
   * Loads more repositories when the "Load More Projects" button is clicked.
   */
  const loadMoreRepos = useCallback(() => {
    if (hasMore && !loading && rateLimit.remaining > 0 && !isBackoff) {
      if (rateLimit.remaining <= BACKOFF_THRESHOLD) {
        setIsBackoff(true)
        // Inform the user
        setError(`Approaching GitHub API rate limit. Delaying further requests for ${BACKOFF_DELAY / 1000} seconds.`)
        // Set a timeout to remove backoff after delay
        setTimeout(() => {
          setIsBackoff(false)
          setError(null) // Clear the error message
          setPage((prevPage) => prevPage + 1)
        }, BACKOFF_DELAY)
      } else {
        setPage((prevPage) => prevPage + 1)
      }
    }
  }, [hasMore, loading, rateLimit.remaining, isBackoff])

  /**
   * Filters repositories based on search query and selected programming language.
   */
  const filteredRepos = useMemo(() => {
    return repos.filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchQuery) ||
        (repo.description && repo.description.toLowerCase().includes(searchQuery))
      const matchesLanguage =
        selectedLanguage === '' || (repo.languages && repo.languages[selectedLanguage])
      return matchesSearch && matchesLanguage
    })
  }, [repos, searchQuery, selectedLanguage])

  /**
   * Separates featured projects from regular repositories.
   */
  const featuredRepos = useMemo(() => {
    return filteredRepos.filter((repo) =>
      featuredProjectsNames.includes(repo.name)
    )
  }, [filteredRepos])

  const regularRepos = useMemo(() => {
    return filteredRepos.filter(
      (repo) => !featuredProjectsNames.includes(repo.name)
    )
  }, [filteredRepos])

  /**
   * Calculates the time remaining until the GitHub API rate limit resets.
   */
  const timeUntilReset = useMemo(() => {
    if (!rateLimit.reset) return null
    const now = Date.now()
    const difference = rateLimit.reset - now
    if (difference <= 0) return null
    const minutes = Math.floor(difference / 60000)
    const seconds = Math.floor((difference % 60000) / 1000)
    return `${minutes}m ${seconds}s`
  }, [rateLimit.reset])

  // Slick carousel settings for mobile
  const sliderSettings = useMemo(() => ({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    accessibility: true, // Enable accessibility features
  }), [])

  return (
    <div className="container mx-auto py-20 px-4">
      {/* Display Error Messages */}
      {error && (
        <div
          className="bg-red-100 text-red-700 p-4 rounded mb-6"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      {/* Rate Limit Warning */}
      {rateLimit.remaining <= RATE_LIMIT_THRESHOLD && rateLimit.remaining > 0 && (
        <div
          className="bg-yellow-100 text-yellow-700 p-4 rounded mb-6"
          role="alert"
          aria-live="polite"
        >
          Warning: You have {rateLimit.remaining} GitHub API requests remaining.
        </div>
      )}

      {/* Rate Limit Exceeded */}
      {rateLimit.remaining === 0 && (
        <div
          className="bg-red-100 text-red-700 p-4 rounded mb-6"
          role="alert"
          aria-live="assertive"
        >
          You have reached the GitHub API rate limit. Please try again in {timeUntilReset || 'a few moments'}.
        </div>
      )}

      {/* GitHub Overview Section */}
      <section className="bg-gray-900 text-white py-12 px-6 rounded-lg mb-12">
        <h2 className="text-3xl font-bold text-center mb-6">GitHub Overview</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Stats */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <FaGithub className="mr-2" aria-hidden="true" /> GitHub Stats
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaStar className="text-yellow-400 mr-2" aria-hidden="true" />
                Total Stars: <strong>{profileStats.totalStars}</strong>
              </li>
              <li className="flex items-center">
                <FaCodeBranch className="text-green-400 mr-2" aria-hidden="true" />
                Total Repositories: <strong>{profileStats.publicRepos}</strong>
              </li>
              <li className="flex items-center">
                <FaUsers className="text-blue-400 mr-2" aria-hidden="true" />
                Followers: <strong>{profileStats.followers}</strong>
              </li>
            </ul>
          </div>

          {/* Circular Progress for Contribution Score */}
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-2xl font-semibold mb-4">Contribution Score</h3>
            <div className="w-32 mx-auto" aria-label="Contribution Score">
              <CircularProgressbar
                value={75} // Replace with actual contribution score
                text={"B-"}
                styles={buildStyles({
                  textColor: "#fff",
                  pathColor: "#f06292",
                  trailColor: "#d6d6d6",
                })}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <h1 className="text-4xl font-bold mb-8 text-center">Highlighted Projects</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="w-full md:w-1/3">
          <label htmlFor="search" className="sr-only">
            Search for projects
          </label>
          <input
            type="text"
            id="search"
            placeholder="Search for projects..."
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search for projects"
          />
        </div>

        {/* Language Filter */}
        <div className="w-full md:w-1/3">
          <label htmlFor="language-filter" className="sr-only">
            Filter by Language
          </label>
          <select
            id="language-filter"
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedLanguage}
            onChange={handleLanguageChange}
            aria-label="Filter projects by programming language"
          >
            <option value="">Filter by Language</option>
            {availableLanguages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading && repos.length === 0 ? (
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
                    <Suspense fallback={<div>Loading project...</div>} key={repo.id}>
                      <ProjectCard repo={repo} />
                    </Suspense>
                  ))}
                </Slider>
              </div>

              {/* Grid for Desktop View */}
              <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-8">
                {featuredRepos.map((repo) => (
                  <Suspense fallback={<div>Loading project...</div>} key={repo.id}>
                    <ProjectCard repo={repo} />
                  </Suspense>
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
                <Suspense fallback={<div>Loading project...</div>} key={repo.id}>
                  <ProjectCard repo={repo} />
                </Suspense>
              ))}
            </Slider>
          </div>

          {/* Grid for Desktop */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {regularRepos.map((repo) => (
              <Suspense fallback={<div>Loading project...</div>} key={repo.id}>
                <ProjectCard repo={repo} />
              </Suspense>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-8">
              <button
                type="button"
                className={`bg-blue-500 text-white p-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  loading || rateLimit.remaining === 0 || isBackoff ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                }`}
                onClick={loadMoreRepos}
                disabled={loading || rateLimit.remaining === 0 || isBackoff}
                aria-label="Load more projects"
              >
                {loading ? 'Loading more projects...' : 'Load More Projects'}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Memoize the ProjectsPage component to prevent unnecessary re-renders
export default React.memo(ProjectsPage)
