import { BlurView } from 'expo-blur';
import { StyleSheet, useColorScheme, View } from 'react-native';
import styled from 'styled-components/native';
import { makeImgPath } from '../utils';
import Poster from './Poster';

const BgImg = styled.Image``;

//* TS에서 style-component의 prop을 받는 법
const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? 'white' : props.theme.textColor)};
`;

// #3.4 Create comp. for poster, overview, vote_average
//// const Poster = styled.Image`
////   width: 100px;
////   height: 160px;
////   border-radius: 5px;
//// `;
// #3.5 Refactor: see Poster.tsx

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

// create props for TS
interface SlideProps {
  backdrop_path: string;
  poster_path: string;
  original_title: string;
  vote_average: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdrop_path,
  poster_path,
  original_title,
  vote_average,
  overview,
}) => {
  const isDark = useColorScheme() === 'dark';

  return (
    //  flwx: 1 로 style을 설정해야 보인다
    <View style={{ flex: 1 }}>
      <BgImg style={StyleSheet.absoluteFill} source={{ uri: makeImgPath(backdrop_path) }} />
      <BlurView tint={isDark ? 'dark' : 'light'} intensity={50} style={StyleSheet.absoluteFill}>
        {/* #3.4 Step 2. render datas */}
        <Wrapper>
          {/* <Poster>도 별도의 component로 분리 (see ../components/Poster.tsx*/}
          {/*//// <Poster source={{ uri: makeImgPath(poster_path) }}></Poster> */}
          <Poster path={poster_path} />
          <Column>
            <Title isDark={isDark}>{original_title}</Title>
            {vote_average > 0 ? <Votes>⭐️ {vote_average}/10</Votes> : null}
            {/* Show only 80 characters */}
            <Overview>{overview.slice(0, 90)} ...</Overview>
          </Column>
        </Wrapper>
      </BlurView>
    </View>
  );
};

export default Slide;
