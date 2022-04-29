import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { useQuery, useQueryClient } from 'react-query';
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
  ///// const [refreshing, setRefreshing] = useState(false);

  /* #3.14 Refresh 재구현 */
  // refactoring 과정에서 망가진 새로고침 기능을 재구현하자.
  //* ReactQuery의 useQuery 훅의 'refetch', 'isRefetch' 값 활용
  // const {
  //   isLoading: nowPlayingLoading,
  //   data: nowPlayingData,
  //   refetch: refetchNowPlaying,
  //   isRefetching: isRefetchingNowPlaying,
  // } = useQuery('nowPlaying', moviesAPI.getNowPlaying);
  // const {
  //   isLoading: upcomingLoading,
  //   data: upcomingData,
  //   refetch: refetchUpcoming,
  //   isRefetching: isRefetchingUpcoming,
  // } = useQuery('upcoming', moviesAPI.getUpcoming);
  // const {
  //   isLoading: trendingLoading,
  //   data: trendingData,
  //   refetch: refetchTrending,
  //   isRefetching: isRefetchingTrending,
  // } = useQuery('trending', moviesAPI.getTrending);

  // const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  // // refreshing 변수 새로 선언 (useState 대신)
  // const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  // const onRefresh = async () => {
  //   refetchNowPlaying();
  //   refetchUpcoming();
  //   refetchTrending();
  //   //? 이것을 한번에?
  //   //* QueryClient로 refetch하는 법: categorizing을 통해 refetch를 한번에 해보자
  // };
  // console.log('REFRESHING');  // 새로고침 확인

  /* #3.14 query Categorizing - QueryClient.refetchQueries() 활용 */
  // 1-1) refreshing 부분 제거
  // 1-2) query key에 추가적으로 정의 (category 적용을 위해서) -> "movies"라고 공통적인 key 부여
  //   -> array 형태로 (https://react-query.tanstack.com/guides/query-keys#array-keyshttps://react-query.tanstack.com/guides/query-keys#array-keys)
  // 2) QueryCLient를 사용하기 위한 hook 정의
  // 3) queryClient.refetchQueries를 통해 한 번에 refetch

  //* Step 2. queryClient를 사용하기 위한 hook 정의
  // App.tsx에서 QueryClient 인스턴스를 생성했고, 그것을 <QueryCLientProvider>를 통해 넘겨줬기 때문에,
  // 하위의 모든 컴포넌트들은 동일한 client에 접근할 수 있게 된 것.
  const queryClient = useQueryClient();

  //* Step 1-1, 1-2)
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery(['movies', 'nowPlaying'], moviesAPI.getNowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery(['movies', 'upcoming'], moviesAPI.getUpcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(['movies', 'trending'], moviesAPI.getTrending);

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  //* Step 3. queryClient.refetchQueries를 통해 해당 카테고리에 대한 쿼리들을 한 번에 refetch
  const onRefresh = async () => {
    // "movies" query key로 시작하는 쿼리들을 refetch함 (categorizing!)
    queryClient.refetchQueries(['movies']);
  };
  // console.log('REFRESHING'); // 새로고침 확인

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
