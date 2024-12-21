import axios from 'axios';

const TMDB_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MmJhMTBjNDI5OTE0MTU3MzgwOGQyNzEwNGVkMThmYSIsInN1YiI6IjY0ZjVhNTUwMTIxOTdlMDBmZWE5MzdmMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.84b7vWpVEilAbly4RpS01E9tyirHdhSXjcpfmTczI3Q';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': `Bearer ${TMDB_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

export const imageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const fetchTrending = async (mediaType = 'all', timeWindow = 'day') => {
  try {
    const response = await axiosInstance.get(`/trending/${mediaType}/${timeWindow}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
};

export const searchMulti = async (query) => {
  if (!query) return [];
  try {
    const response = await axiosInstance.get('/search/multi', {
      params: { query }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching:', error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}`, {
      params: {
        append_to_response: 'videos,credits,similar'
      }
    });
    
    // Find the trailer or first video
    const videos = response.data.videos?.results || [];
    const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube') || videos[0];
    
    return {
      ...response.data,
      trailer
    };
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};

export const fetchTVDetails = async (id) => {
  try {
    const response = await axiosInstance.get(`/tv/${id}`, {
      params: {
        append_to_response: 'videos,credits,similar'
      }
    });
    
    // Find the trailer or first video
    const videos = response.data.videos?.results || [];
    const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube') || videos[0];
    
    return {
      ...response.data,
      trailer
    };
  } catch (error) {
    console.error('Error fetching TV details:', error);
    return null;
  }
};

export const fetchMoviesByGenre = async (genreId) => {
  try {
    const response = await axiosInstance.get('/discover/movie', {
      params: {
        with_genres: genreId
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    return [];
  }
};

export const fetchTVByGenre = async (genreId) => {
  try {
    const response = await axiosInstance.get('/discover/tv', {
      params: {
        with_genres: genreId
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching TV shows by genre:', error);
    return [];
  }
};
