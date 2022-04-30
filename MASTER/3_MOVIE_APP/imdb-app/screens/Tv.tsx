import { View, Text, ScrollView, FlatList, RefreshControl } from 'react-native';
import { useQuery, useQueryClient } from 'react-query';
import { tvAPI } from '../api';
import HList, { HListSeparator } from '../components/HList';
import Loader from '../components/Loader';
import VMedia from '../components/VMedia';

/* #3.16 TV Screen */
const Tv = () => {
  // Step 1. React Query의 useQuery 훅을 사용하여 API 호출 (Movies screen에서 했던 것과 동일)
  // 이 때, 쿼리 categorizing을 위해 "tv"를 query key에 추가
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery(['tv', 'trending'], tvAPI.getTrending);
  const {
    isLoading: todayLoading,
    data: todayData,
    isRefetching: isRefetchingToday,
  } = useQuery(['tv', 'today'], tvAPI.getAiringToday);
  const {
    isLoading: topLoading,
    data: topData,
    isRefetching: isRefetchingTop,
  } = useQuery(['tv', 'top'], tvAPI.getTopRated);

  const loading = trendingLoading || todayLoading || topLoading;

  // (Step 7)
  const queryClient = useQueryClient();
  const refreshing = isRefetchingTrending || isRefetchingToday || isRefetchingTop;
  const onRefresh = () => {
    queryClient.refetchQueries(['tv']);
  };

  // Step 2. Movies.tsx에서 썼던 <Loader> 컴포넌트를 여기에서도 재사용하므로, /components 폴더 아래에 따로 빼자
  // see "/components/Loader.tsx"
  return loading ? (
    <Loader />
  ) : (
    // Step 3. 3개의 FlatList 안에 위의 3개 각각의 데이터를 rendering. <ScrollView>로 감싸자
    // Step 5. 'contentContainerStyle'을 통해서 ScrollView, FlatList, FlatList item 사이에 간격을 주자
    // Step 7. 새로고침 기능 추가 (#3.14 강의 참고, 과정 동일)
    <ScrollView
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      contentContainerStyle={{ paddingVertical: 30 }}
    >
      {/* Step 4. <HList> 컴포넌트를 만들어 그것을 활용해 리스트를 만들자 */}
      {/* Step 6. composition 과정: <FlatList> 부분도 'data'부분을 제외하고 동일한 것을 볼 수 있음. HList 안에 정의하자. => 훨씬 깔끔해짐*/}
      <HList title="Trending TV" data={trendingData.results}>
        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          data={trendingData.results}
          renderItem={({ item }) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
          ItemSeparatorComponent={HListSeparator}
        /> */}
      </HList>
      <HList title="Airing Today" data={todayData.results}>
        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          data={todayData.results}
          renderItem={({ item }) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
          ItemSeparatorComponent={HListSeparator}
        /> */}
      </HList>
      <HList title="Top Rated" data={topData.results}>
        {/* <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 30 }}
          data={topData.results}
          renderItem={({ item }) => (
            <VMedia
              posterPath={item.poster_path}
              originalTitle={item.original_name}
              voteAverage={item.vote_average}
            />
          )}
          ItemSeparatorComponent={HListSeparator}
        /> */}
      </HList>
    </ScrollView>
  );
};

export default Tv;
