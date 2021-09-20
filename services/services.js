import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'ac0e79908b5cf444912dede14d91ff93';

// Get Popular Movies
export const getPopularMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`);
  return res.data.results;
};

// Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const res = await axios.get(`${apiUrl}/movie/upcoming?api_key=${apiKey}`);
  return res.data.results;
};

// Get Family Movies
export const getFamilyMovies = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=10751`,
  );
  return res.data.results;
};

// Get Documentary Movies
export const getDocumentaryMovies = async () => {
  const res = await axios.get(
    `${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=99`,
  );
  return res.data.results;
};

// Get Popular TV
export const getPopularTV = async () => {
  const res = await axios.get(`${apiUrl}/tv/popular?api_key=${apiKey}`);
  return res.data.results;
};

// Get Movie
export const getMovie = async id => {
  const res = await axios.get(`${apiUrl}/movie/${id}?api_key=${apiKey}`);
  return res.data;
};

// Search For Movie Or TV
export const searchMovieTV = async (query, type) => {
  const res = await axios.get(
    `${apiUrl}/search/${type}?api_key=${apiKey}&query=${query}`,
  );
  return res.data.results;
};
