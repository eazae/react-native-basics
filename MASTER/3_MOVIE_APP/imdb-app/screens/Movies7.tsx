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
! pt.2) 개봉예정 영화
  pt.3) 인기 영화
*/

const API_KEY = '526f48bd5b75cc00935664664fa4c185';

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

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

// $3.7 create comp.s
const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const HorizontalMovie = styled.View`
  padding: 0px 30px;
  margin-bottom: 30px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: white;
  opacity: 0.8;
  /* color: rgba(255, 255, 255, 0.8) 위와 동일 */
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
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

  const getUpcoming = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
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
      <ListTitle>Trending Movies</ListTitle>
      <TrendingScroll
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 30 }}
      >
        {trending.map((movie) => (
          <Movie key={movie.id}>
            <Poster path={movie.poster_path} />
            <Title>
              {movie.original_title.slice(0, 13)}
              {movie.original_title.length > 13 ? '...' : null}
            </Title>
            <Votes>{movie.vote_average > 0 ? `⭐️${movie.vote_average}/10` : 'Coming soon'}</Votes>
          </Movie>
        ))}
      </TrendingScroll>
      {/* #3.6 Coming Soon Movies */}
      <ComingSoonTitle>Coming Soon</ComingSoonTitle>
      {upcoming.map((movie) => (
        <HorizontalMovie key={movie.id}>
          <Poster path={movie.poster_path} />
          <HColumn>
            <Title>{movie.original_title}</Title>
            <Release>
              {new Date(movie.release_date).toLocaleDateString('ko', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Release>
            <Overview>
              {movie.overiew !== '' && movie.overview.length > 140
                ? `${movie.overview.slice(0, 140)}...`
                : movie.overview}
            </Overview>
          </HColumn>
        </HorizontalMovie>
      ))}
    </Container>
  );
};

export default Movies;
