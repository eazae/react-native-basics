/* #2.10 Stack Navigator */
// Step 1. install package & import package
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';

// Step 2. create Stack Nav. insatnce
const NativeStack = createNativeStackNavigator();

// Step 4. <임시> dummy <Screen>s for testing
/* #2.10 Navigation props: interact with Navigation*/
// (https://reactnavigation.org/docs/navigation-prop/)
const ScreenOne = ({ navigation: { navigate } }) => (
  //// <View><Text>One</Text></View>
  // <View>를 터치가 가능한 component(<TouchableOpacity>)로 바꾸자
  /* 'navigate' 함수: param으로 이동할 타겟 Screen의 name만 넘겨주면 됨
  (단, name은 아래 <NativeStack.Screen>의 name prop의 것과 *둉일*해야함) */
  <TouchableOpacity onPress={() => navigate('Two')}>
    <Text>Go to Two</Text>
  </TouchableOpacity>
);
// ScreenOne을 클릭해서 이동한 경우, 위의 title 부분이 자동으로 이전화면 name(-> 'One')으로 되어있음 (Native Stack이라 가능)
const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Three')}>
    <Text>Go to Three</Text>
  </TouchableOpacity>
);
/* 'goBack' 함수: 이전 화면으로 돌아감 */
/* 'setOptions': 스크린 옵션을 설정할 수 있게 해줌*/
// 설정 가능한 option들: https://reactnavigation.org/docs/native-stack-navigator#options
const ScreenThree = ({ navigation: { goBack, setOptions } }) => (
  <TouchableOpacity
    onPress={() =>
      // goBack()
      setOptions({ title: 'CHANGED TITLE' })
    }
  >
    {/* <Text>Go Back</Text> */}
    <Text>Change Options (title)</Text>
  </TouchableOpacity>
);

// Step 3. create Stack component
const Stack = () => (
  <NativeStack.Navigator>
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
