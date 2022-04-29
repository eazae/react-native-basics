const API_KEY = '526f48bd5b75cc00935664664fa4c185';
const BASE_URL = 'https://api.themoviedb.org/3';

/* #3.15 TypeScript - API response에 type 정의 */
// Movie Obj.
export interface Movie {
  // tip) JS의 힘을 빌려, console.log(Object.keys(응답 아무거나))로 간편하게 가져오자 - Movies15.tsx
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

// /tv, /movie API 공통 부분
interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

const getTrending = () =>
  fetch(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`).then((response) => response.json());

const getUpcoming = () =>
  fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(
    (response) => response.json()
  );

const getNowPlaying = () =>
  fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`).then(
    (response) => response.json()
  );

export const moviesAPI = { getTrending, getUpcoming, getNowPlaying };
