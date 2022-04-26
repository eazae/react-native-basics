import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import Poster from '../components/Poster';
// import { BlurView } from '@react-native-community/blur';

/* #3.1 'Movies' 화면
  pt.1) 상영중 영화
  pt.2) 개봉예정 영화
!  pt.3) 인기 영화
*/

const API_KEY = '526f48bd5b75cc00935664664fa4c185';

const Container = styled.ScrollView`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

// #3.6 create comp.s
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.ScrollView`
  margin-top: 20px;
`;

const Movie = styled.View`
  margin-right: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;
const Votes = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  font-size: 10px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
    ).json();
    setNowPlaying(results);
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

  const getData = async () => {
    await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
    setLoading(false);
  };

  useEffect(() => {
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
        containerStyle={{ marginBottom: 30, width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
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
      {/* #3.6 Trending Movies */}
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        horizontal
        showsHorizontalScrollIndicator={false}
        //  그냥 style로 주면 X, 'container'에 padding을 적용해야됨
        contentContainerStyle={{ paddingHorizontal: 30 }}
      >
        {trending.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 ? '...' : null}
            </Title>
            <Votes>⭐️{movie.vote_average}/10</Votes>
          </Movie>
        ))}
      </TrendingScroll>
    </Container>
  );
};

export default Movies;
