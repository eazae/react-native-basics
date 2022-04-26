import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';
// #3.2 install and import a Swiper library
import Swiper from 'react-native-web-swiper';
// #3.2 import 'Dimensions' to calculate screen ratio
import { Dimensions } from 'react-native';

/* #3.1 'Movies' 화면
!  pt.1) 상영중 영화
  pt.2) 개봉예정 영화
  pt.3) 인기 영화
*/

// #3.2 Step 5. API call
const API_KEY = '526f48bd5b75cc00935664664fa4c185';

// #3.2 Step1. ScrollView
const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

// Step 4. get the divice's screen height
//? JS: 위 line과 동일한 코드임. 하지만 아래의 방식을 더 선호. {} 안에 {height, width, ...} 처럼 여러개 뽑아올 수 있기 떄문
// const SCREEN_HEIGHT = Dimensions.get('window').height;
const { height: SCREEN_HEIGHT } = Dimensions.get('window'); // ES6 기능: 'height'의 alias 지정 가능

const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => {
  const getNowPlaying = () => {
    // Step 5. API call using fetch
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`);
  };

  return (
    // #3.2 Step 2. Create ScrollView
    <Container>
      {/* #3.2 Step 3. Create Swiper component */}
      <Swiper loop timeout={3} controlsEnabled={false} containerStyle={{ width: '100%', height: SCREEN_HEIGHT / 4 }}>
        <View style={{ backgroundColor: 'red' }}></View>
        <View style={{ backgroundColor: 'blue' }}></View>
        <View style={{ backgroundColor: 'red' }}></View>
        <View style={{ backgroundColor: 'purple' }}></View>
      </Swiper>
    </Container>
  );
};

export default Movies;
