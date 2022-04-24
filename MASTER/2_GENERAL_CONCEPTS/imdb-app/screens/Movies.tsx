/* #2.16 TypeScript */
// error 뜨더라도, TS의 compile engine으로 빌드되는 것이 아니기 때문에, JS일 때와 동일하게 문제없이 동작함

//* 한 번 TS 대로 고쳐보자
// a. (https://styled-components.com/docs/api#typescript)
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import styled from 'styled-components/native';

// b. props.theme.* : Theme의 properties에 대해서 자동완성기능 갖도록
// (https://styled-components.com/docs/api#create-a-declarations-file)
// -> see '~/styled.d.ts'
const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

// c. 'navigation' prop Type 정의
// (https://reactnavigation.org/docs/typescript#type-checking-screens)
// 'NativeStackScreenProps'를 import 받아오고, 일단은 any로 설정 (나중에 다룰 예정)
const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = ({ navigation: { navigate } }) => (
  <Btn onPress={() => navigate('Stack', { screen: 'Three' })}>
    {/* <Title selected={false}>Movies</Title> */}
    <Title>Movies</Title>
  </Btn>
);

export default Movies;
