import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';

//* #3.12 see 'api.ts'
// const API_KEY = '526f48bd5b75cc00935664664fa4c185';

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

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

// #3.12 refactor code
const renderVMedia = ({ item }) => (
  <VMedia
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    voteAverage={item.vote_average}
  />
);

const renderHMedia = ({ item }) => (
  <HMedia
    posterPath={item.poster_path}
    originalTitle={item.original_title}
    overview={item.overview}
    releaseDate={item.release_date}
  />
);

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const movieKeyExtractor = (item) => item.id + '';

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
  const [refreshing, setRefreshing] = useState(false);
  /* #3.12 refactor: see api.ts */
  // continued in Movies13.tsx (아직은 error남)
  //// const [loading, setLoading] = useState(true);
  //// const [nowPlaying, setNowPlaying] = useState([]);
  //// const [upcoming, setUpcoming] = useState([]);
  //// const [trending, setTrending] = useState([]);
  //
  //// const getNowPlaying = async () => {
  ////   const { results } = await (
  ////     await fetch(
  ////       `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ////     )
  ////   ).json();
  ////   setNowPlaying(results);
  //// };
  //
  //// const getUpcoming = async () => {
  ////   const { results } = await (
  ////     await fetch(
  ////       `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1&region=KR`
  ////     )
  ////   ).json();
  ////   setUpcoming(results);
  //// };
  //
  //// const getTrending = async () => {
  ////   const { results } = await (
  ////     await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`)
  ////   ).json();
  ////   setTrending(results);
  //// };
  //
  //// const getData = async () => {
  ////   await Promise.all([getNowPlaying(), getUpcoming(), getTrending()]);
  ////   setLoading(false);
  //// };
  //
  //// useEffect(() => {
  ////   getData();
  //// }, []);

  const onRefresh = async () => {
    //// setRefreshing(true);
    //// await getData();
    //// setRefreshing(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={() => (
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{ marginBottom: 40, width: '100%', height: SCREEN_HEIGHT / 4 }}
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
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              data={trending}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              // #3.12 refactor code
              renderItem={renderVMedia}
              ItemSeparatorComponent={VSeparator}
              keyExtractor={movieKeyExtractor}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      )}
      data={upcoming}
      // #3.12 refactor code
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
    //// </Container>
  );
};

export default Movies;
