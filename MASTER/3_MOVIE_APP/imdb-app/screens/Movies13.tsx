import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
// #3.13 import 'useQuery'
import { useQuery } from 'react-query';
import { moviesAPI } from '../api';

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

  /* #3.13 use useQuery Hook */
  //* [arguments]
  // 1) query key: (쿼리와 동일한 이름으로 설정해봄) 필요한 이유?
  //            -> React Query는 caching을 사용하기 때문!
  // 2) fetcher: ~/api.ts에 있는 fetcher import 받아옴
  // ex.  const { isLoading, data } = useQuery('nowPlaying', moviesAPI.getNowPlaying);
  // (하지만, "isLoading", "data"같이 이름을 동일하게 쓸 수 없으므로.. ES6의 이름 지정 기능을 활용)
  const { isLoading: nowPlayingLoading, data: nowPlayingData } = useQuery(
    'nowPlaying',
    moviesAPI.getNowPlaying
  );
  const { isLoading: upcomingLoading, data: upcomingData } = useQuery(
    'upcoming',
    moviesAPI.getUpcoming
  );
  const { isLoading: trendingLoading, data: trendingData } = useQuery(
    'trending',
    moviesAPI.getTrending
  );

  // loading state 재정의
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

  const onRefresh = async () => {};

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    // "data" 부분에 hook에서 받아온 data 의 이름으로 대체, "results" 키의 데이터를 뽑아와야 함
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
            {nowPlayingData.results.map((movie) => (
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
              data={trendingData.results}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              renderItem={renderVMedia}
              ItemSeparatorComponent={VSeparator}
              keyExtractor={movieKeyExtractor}
            />
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      )}
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={renderHMedia}
    />
  );
};

export default Movies;
