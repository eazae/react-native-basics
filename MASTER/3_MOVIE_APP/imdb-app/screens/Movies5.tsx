import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
// import { BlurView } from '@react-native-community/blur';

/* #3.1 'Movies' 화면
  pt.1) 상영중 영화
!  pt.2) 개봉예정 영화
  pt.3) 인기 영화
*/

/* #3.5 Refactor code */

const API_KEY = '526f48bd5b75cc00935664664fa4c185';

const Container = styled.ScrollView``;

// const View = styled.View`
//   flex: 1;
// `;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window'); // ES6 기능: 'height'의 alias 지정 가능

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  // Create state for upcoming, trending movies
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
    ).json();

    setNowPlaying(results);
    //// setLoading(false);
  };

  // #3.5 API call for upcoming, trending movies
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/get_upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
    ).json();
    setUpcoming(results);
  };

  const getTrending = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
    ).json();
    setTrending(results);
  };

  // pack the API call functions in one function
  const getData = async () => {
    // wait for all 3 datas
    await Promise.all([getTrending(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
    //// getNowPlaying();
    // #3.5 나머지 API들도 함께 호출
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3}
        showsButtons={false}
        showsPagination={false}
        style={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
        {/* Step 1. Detatch component into ~/components folder  */}
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdrop_path={movie.backdrop_path}
            poster_path={movie.poster_path}
            original_title={movie.original_title}
            vote_average={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
