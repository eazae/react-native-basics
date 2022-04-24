import styled from 'styled-components/native';

/* #2.15 이렇게 theme에 접근가능 */
const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

const Movies = () => (
  <Btn>
    <Title selected={false}>Movies</Title>
  </Btn>
);

export default Movies;
