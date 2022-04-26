import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions, StyleSheet, useColorScheme } from 'react-native';
import { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';
import { makeImgPath } from '../utils';
import { BlurView } from 'expo-blur';
// import { BlurView } from '@react-native-community/blur';

/* #3.1 'Movies' 화면
!  pt.1) 상영중 영화
  pt.2) 개봉예정 영화
  pt.3) 인기 영화
*/

const API_KEY = '526f48bd5b75cc00935664664fa4c185';

const Container = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image``;

//* TS에서 style-component의 prop을 받는 법
const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
`;

// #3.4 Create comp. for poster, overview, vote_average
const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 5px;
`;

const Overview = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

//* 이미 존재하는 style로부터 다른 component 만드는 법
// 아래와 같이 선언을 하면, <Overview> component를 extend(?)받아 새로운 컴포넌트를 정의할 수 있다
const Votes = styled(Overview)`
  margin-top: 5px;
  font-size: 12px;
`;

// #3.4 Create comp. for a Wrapper comp.
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  margin-left: 15px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window'); // ES6 기능: 'height'의 alias 지정 가능

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
  // add DarkMode
  const isDark = useColorScheme() === 'dark';

  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
    ).json();

    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      {/* ////<Swiper loop timeout={3} controlsEnabled={false} containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}> */}
      {/* #3.4 (change Swiper library) */}
      <Swiper
        horizontal
        loop
        autoplay
        autoplayTimeout={3}
        showsButtons={false}
        showsPagination={false}
        style={{ width: '100%', height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(movie.backdrop_path) }} />
            <BlurView tint={isDark ? 'dark' : 'light'} intensity={50} style={StyleS.absoluteFill}>
              {/* #3.4 Step 2. render datas */}
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }}></Poster>
                <Column>
                  <Title isDark={isDark}>{movie.original_title}</Title>
                  {movie.vote_average > 0 ? <Votes>⭐️ {movie.vote_average}/10</Votes> : null}
                  {/* Show only 80 characters */}
                  <Overview>{movie.overview.slice(0, 90)} ...</Overview>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
