import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import Slide from '../components/Slide';
import VMedia from '../components/VMedia';
import HMedia from '../components/HMedia';
import { useQuery, useQueryClient } from 'react-query';
import { Movie, MovieResponse, moviesAPI } from '../api';
import Loader from '../components/Loader';

// see "/components/Loader.tsx"
//// const Loader = styled.View`
////   flex: 1;
////   justify-content: center;
////   align-items: center;
//// `;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
` as unknown as typeof FlatList;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const movieKeyExtractor = (item: Movie) => item.id + '';

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
  const queryClient = useQueryClient();

  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesAPI.getNowPlaying);
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>(['movies', 'upcoming'], moviesAPI.getUpcoming);
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>(['movies', 'trending'], moviesAPI.getTrending);

  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing = isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;

  const onRefresh = async () => {
    queryClient.refetchQueries(['movies']);
  };

  return loading ? (
    //// <Loader>
    ////   <ActivityIndicator />
    //// </Loader>
    // #3.16 컴포넌트로 따로 떼어냄
    <Loader />
  ) : upcomingData ? (
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
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdrop_path={movie.backdrop_path || ''}
                poster_path={movie.poster_path || ''}
                original_title={movie.original_title}
                vote_average={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            {trendingData ? (
              <TrendingScroll
                data={trendingData.results}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                ItemSeparatorComponent={VSeparator}
                keyExtractor={movieKeyExtractor}
                renderItem={({ item }) => (
                  <VMedia
                    posterPath={item.poster_path || ''}
                    originalTitle={item.original_title}
                    voteAverage={item.vote_average}
                  />
                )}
              />
            ) : null}
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      )}
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path || ''}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  ) : null;
};

export default Movies;
