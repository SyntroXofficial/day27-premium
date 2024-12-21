import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, PlayIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import MediaCard from '../components/streaming/MediaCard';
import MediaModal from '../components/streaming/MediaModal';
import { fetchTrending, searchMulti, fetchMoviesByGenre } from '../services/movieService';

const movieCategories = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'War',
  'Western'
];

const genreMap = {
  'action': 28,
  'adventure': 12,
  'animation': 16,
  'comedy': 35,
  'crime': 80,
  'documentary': 99,
  'drama': 18,
  'family': 10751,
  'fantasy': 14,
  'history': 36,
  'horror': 27,
  'music': 10402,
  'mystery': 9648,
  'romance': 10749,
  'sci-fi': 878,
  'thriller': 53,
  'war': 10752,
  'western': 37
};

const genres = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 99, name: 'Documentary' },
  { id: 18, name: 'Drama' },
  { id: 10751, name: 'Family' },
  { id: 14, name: 'Fantasy' },
  { id: 36, name: 'History' },
  { id: 27, name: 'Horror' },
  { id: 10402, name: 'Music' },
  { id: 9648, name: 'Mystery' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Sci-Fi' },
  { id: 53, name: 'Thriller' },
  { id: 10752, name: 'War' },
  { id: 37, name: 'Western' }
];

export default function Streaming() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [media, setMedia] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch initial featured content and media
  useEffect(() => {
    const fetchInitialContent = async () => {
      try {
        setLoading(true);
        const trendingResults = await fetchTrending();
        
        // Set featured movies (top 12 with backdrop and good rating)
        const featured = trendingResults
          .filter(item => item.backdrop_path && item.vote_average >= 7)
          .slice(0, 12);
        setFeaturedMovies(featured);
        
        // Set initial media content
        setMedia(trendingResults);
      } catch (error) {
        console.error('Error fetching initial content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialContent();
  }, []);

  // Handle category changes
  useEffect(() => {
    const fetchByCategory = async () => {
      if (selectedCategory === 'all') return;
      
      try {
        setLoading(true);
        const results = await fetchTrending(selectedCategory);
        setMedia(results);
      } catch (error) {
        console.error('Error fetching by category:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!searchQuery) {
      fetchByCategory();
    }
  }, [selectedCategory, searchQuery]);

  // Handle genre selection
  useEffect(() => {
    const fetchByGenre = async () => {
      if (!selectedGenre) return;
      
      try {
        setLoading(true);
        const results = await fetchMoviesByGenre(selectedGenre);
        setMedia(results);
      } catch (error) {
        console.error('Error fetching by genre:', error);
      } finally {
        setLoading(false);
      }
    };

    if (!searchQuery) {
      fetchByGenre();
    }
  }, [selectedGenre, searchQuery]);

  // Handle search and category changes
  useEffect(() => {
    const fetchContent = async () => {
      if (!searchQuery) return;
      
      try {
        setLoading(true);
        const results = await searchMulti(searchQuery);
        setMedia(results);
      } catch (error) {
        console.error('Error searching:', error);
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchContent, 500);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  // Auto rotate featured content
  useEffect(() => {
    if (featuredMovies.length > 0) {
      const interval = setInterval(() => {
        setCurrentFeaturedIndex(prev => 
          prev === featuredMovies.length - 1 ? 0 : prev + 1
        );
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [featuredMovies]);

  const nextFeatured = () => {
    setCurrentFeaturedIndex(prev => 
      prev === featuredMovies.length - 1 ? 0 : prev + 1
    );
  };

  const prevFeatured = () => {
    setCurrentFeaturedIndex(prev => 
      prev === 0 ? featuredMovies.length - 1 : prev - 1
    );
  };

  const currentFeatured = featuredMovies[currentFeaturedIndex];

  return (
    <div className="min-h-screen bg-black">
      {/* Featured Hero Section */}
      <div className="relative w-full h-[60vh] bg-black">
        <AnimatePresence mode="wait">
          {currentFeatured && (
            <motion.div
              key={currentFeatured.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0">
                <img
                  src={`https://image.tmdb.org/t/p/original${currentFeatured.backdrop_path}`}
                  alt={currentFeatured.title || currentFeatured.name}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <motion.h1 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-bold mb-4"
                >
                  {currentFeatured.title || currentFeatured.name}
                </motion.h1>
                <motion.p 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg max-w-2xl mb-6 line-clamp-2"
                >
                  {currentFeatured.overview}
                </motion.p>
                <motion.button 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={() => setSelectedMedia(currentFeatured)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <PlayIcon className="w-5 h-5" />
                  Watch Now
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Featured Navigation */}
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 flex justify-between items-center px-4 z-10">
          <button 
            onClick={prevFeatured}
            className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <ChevronLeftIcon className="w-8 h-8" />
          </button>
          <button 
            onClick={nextFeatured}
            className="p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
          >
            <ChevronRightIcon className="w-8 h-8" />
          </button>
        </div>

        {/* Featured Indicators */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 flex justify-center gap-2">
          {featuredMovies.map((movie, index) => (
            <button
              key={movie.id}
              onClick={() => setCurrentFeaturedIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentFeaturedIndex 
                  ? 'bg-red-500 scale-125' 
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories and Search */}
      <div className="sticky top-0 z-10 bg-black border-b border-gray-800 shadow-lg">
        <div className="max-w-[2000px] mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedGenre(''); // Reset genre when category changes
                }}
                className="bg-black text-white px-4 py-2 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none min-w-[120px]"
              >
                <option value="all">All</option>
                <option value="movie">Movies</option>
                <option value="tv">TV Shows</option>
              </select>
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-black text-white px-4 py-2 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none min-w-[150px]"
              >
                <option value="">All Genres</option>
                {genres
                  .filter(genre => genre.name) // Only show genres with names
                  .sort((a, b) => a.name.localeCompare(b.name)) // Sort alphabetically
                  .map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (!e.target.value) {
                    // Reset to initial state when search is cleared
                    setSelectedCategory('all');
                    setSelectedGenre('');
                  }
                }}
                placeholder="Search movies & TV shows..."
                className="w-full md:w-[300px] bg-black text-white px-4 py-2 rounded-lg border border-gray-800 focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="bg-black min-h-screen">
        <div className="max-w-[2000px] mx-auto px-6 py-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {loading ? (
              Array.from({ length: 12 }).map((_, index) => (
                <div key={index} className="aspect-[2/3] rounded-xl bg-gray-800 animate-pulse" />
              ))
            ) : (
              media
                .filter(item => item.poster_path)
                .map(item => (
                  <MediaCard
                    key={item.id}
                    media={item}
                    onClick={() => setSelectedMedia(item)}
                  />
                ))
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedMedia && (
        <MediaModal media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      )}
    </div>
  );
}
