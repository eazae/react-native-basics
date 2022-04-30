const API_KEY = '526f48bd5b75cc00935664664fa4c185';
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

// #3.16 refactoring: 코드 정리 - moviesAPI 안에 넣어서 정리
export const moviesAPI = {
  getTrending: () =>
    fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((response) => response.json()),
  getNowPlaying: () =>
    fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(
      (response) => response.json()
    ),
  getUpcoming: () =>
    fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(
      (response) => response.json()
    ),
};

/* #3.16 TV screen 관련 API */
export const tvAPI = {
  getTrending: () =>
    fetch(`${BASE_URL}/trending/tv/week?api_key=${API_KEY}`).then((response) => response.json()),
  getAiringToday: () =>
    fetch(`${BASE_URL}/tv/airing_today?api_key=${API_KEY}`).then((response) => response.json()),
  getTopRated: () =>
    fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`).then((response) => response.json()),
};
