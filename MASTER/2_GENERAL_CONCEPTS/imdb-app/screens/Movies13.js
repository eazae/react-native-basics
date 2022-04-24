import { View, Text, StyleSheet } from 'react-native';
//! CAUTION: import from 'styled-components/native', NOT ' 'styled-components'
//* 이렇게 한 번만 import 받아오면, 그 안에서 RN comp.들 다 활용가능
import styled from 'styled-components/native';

// iii. Styled Component component
const Btn = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: gold;
`;

//! Props: prop의 값에 따라 조정하고 싶을 경우
const Title = styled.Text`
  color: ${(props) => (props.selected ? 'blue' : 'red')};
`;

/* #2.14 Styling */
const Movies = () => (
  /* i) the basic way */
  //// <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  ////   <Text>Movies</Text>
  //// </TouchableOpacity>

  /* ii) StyleSheet: from RN, still JS code */
  // 실수 유발 가능성:  일반적으로 CSS 코드를 작성하는 데에 익숙하기 때문에
  //ex. CSS) align-items: center;
  //    JS)   alignItems: “center”,
  //// <TouchableOpacity style={styles.btn}>
  ////   <Text style={styles.text}>Movies</Text>
  //// </TouchableOpacity>

  /* iii) Styled Components */
  // [장점들]
  // - CSS 코드를 사용할 수 있음
  // - 훨씬 깔끔해진 코드 (style과 분리)
  // - component의 이름을 마음대로 정의할 수 있다는 장점 (<View><View><View>... View 파티 X)
  //    => <Header><Column><Footer> </Footer> ... 이런식으로
  // - import를 'styled' 하나만 받아오면 됨! (NOT import { View, Text, ...(일일이) } from 'react-native';)
  <Btn>
    {/* styled-component Props */}
    <Title selected={true}>Movies</Title>
    <Title selected={false}>Movies</Title>
  </Btn>
);

// ii. StyleSheet
const styles = StyleSheet.create({
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'blue',
  },
});

export default Movies;
