import { View, Text, TouchableOpacity } from 'react-native';

/* #2.12 Make this screen jump to Stack Nav. (in Tab Nav.)*/
// Tabs Navigator 안에 있는 "Movies"(name) 스크린에서, "Three"(name) 스크린으로 이동하게끔 구현해보자.
//* using the 'navigation' prop!
const Movies12 = ({ navigation: { navigate } }) => (
  <TouchableOpacity
    // 이전에 했던 것과 동일한 로직이다.  <*.Screen> 안에 정의한 name의 값을 주면, 해당 스크린으로 이동(navigate)
    onPress={() =>
      // 하지만 아래와 같이 하면, 이동이 의도대로 안되는 것을 확인할 수 있음 (why? Navigator 사이를 이동하려고 하는 것이기 때문)
      //// navigate('Three')
      // then, HOW?
      //! Step ii-3-a. 이동하고자 하는 Nav.의 name (우리의 경우, “Stack”)
      //! Step ii-3-b. 그 Nav. 내부의, (이동하고자 하는) Screen의 name (ex. “Three”)
      navigate('Stack', { screen: 'Three' })
    }
    style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
  >
    <Text>Movies</Text>
  </TouchableOpacity>
);

export default Movies12;
