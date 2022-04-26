import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
// #3.3 import 'ActivityIndicator' for loading indicator
import { ActivityIndicator, Dimensions, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import Swiper from 'react-native-web-swiper';
import { makeImgPath } from '../utils';
// #3.3 import Expo's BlurView
import { BlurView } from 'expo-blur';

/* #3.1 'Movies' 화면
!  pt.1) 상영중 영화
  pt.2) 개봉예정 영화
  pt.3) 인기 영화
*/

const API_KEY = '526f48bd5b75cc00935664664fa4c185';

const Container = styled.ScrollView`
  /* // 일괄적으로 배경색 적용 => see "Tabs.tsx" */
  /* //// background-color: ${(props) => props.theme.mainBgColor}; */
`;

const View = styled.View`
  flex: 1;
`;

// #3.3 Step 3. make <ActivityIndicator> placed in center
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  /*//? Step 4. 이렇게 메번 설정을 따로 해야되는가 (X) => see 'Tabs.tsx'*/
  /* //// background-color: ${(props) => props.theme.mainBgColor}; */
`;

// #3.3 Step 10. Create View comp. for nowPlaying movie
const BgImg = styled.Image`
  // Step 13. absolute 컴포넌트가 꽉채우는 style ->
  // 하지만 이 style 적용은 자주 쓰임, 매번 정의하기 불편  ex. <BlurView>에도 적용해야 됨..
  //* StyleSheet (RN 패키지)에 이 스타일 패턴을 정의해 놓은 constant가 있음: "absoluteFill"
  // (see <BlurView> style prop 정의부분)
  /* width: 100%;
  height: 100%;
  position: absolute; // 제목과 포개져 보여야 함 */
`;

// #3.3 Step 12. Create Title comp.
const Title = styled.Text`
  flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get('window'); // ES6 기능: 'height'의 alias 지정 가능

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
  /* #3.3 Step1. Create 'loading' state */
  const [loading, setLoading] = useState(true);
  // Step 7. Create state for movie list
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlaying = async () => {
    // const response = await fetch(
    //   `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    // );
    // const json = await response.json().results;
    //* 조금 더 짧게 표현하고 싶다면? (await 중첩, 필요한 key의 value바로 뽑아옴)
    const { results } = await (
      await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`)
    ).json();

    // Step 8. put data in state
    setNowPlaying(results);
    // Step 6. update loading state
    setLoading(false);
  };

  // #3.3 Step 5. get API data
  useEffect(() => {
    getNowPlaying();
  }, []);

  // #3.3 Step 2. "loading" state에 따라 compoenent render
  // loading 상태라면,로딩 indicator를 렌더링 해주자 (<ActivityIndicator>)
  // => 이것을 "Loader"라는 컴포넌트로 감싸자
  return loading ? (
    // TODO: 나중에 재사용가능하도록 Loader 컴포넌트를 별도의 파일로 분리할 것임
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container>
      <Swiper loop timeout={3} controlsEnabled={false} containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}>
        {/* Step 9. render View for each data
          //? TS type check에 문제 -> fetch방식으로 API호출을 하고 있어서 그럼. React-Query를 사용하면 매우 쉽게 해결 가능 */}
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            {/* Step 11. render image */}
            <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(movie.backdrop_path) }} />
            {/* <BlurView intensity={80} style={{ width: '100%', height: '100%', position: 'absolute' }}> */}
            <BlurView intensity={80} style={StyleSheet.absoluteFill}>
              <Title>{movie.original_title}</Title>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </Container>
  );
};

export default Movies;
