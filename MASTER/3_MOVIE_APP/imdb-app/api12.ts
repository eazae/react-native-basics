/* #3.12 fetchers file for React Query */
// API 호출을 하는 'fetcher'들을 이 파일에서 한 군데에서 관리

const API_KEY = '526f48bd5b75cc00935664664fa4c185';
const BASE_URL = 'https://api.themoviedb.org/3';

/* refactoring */
// ./screens/Movies.tsx 에 있던 API 호출들을 아래와 같이 따로 뗴냄
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

// 위 함수들을 import할 때, 더 readable하게 하기 위해서, 아래와 같이 export
// (moviesAPI.* 처럼 호출할 수 있게)
export const moviesAPI = { getTrending, getUpcoming, getNowPlaying };
