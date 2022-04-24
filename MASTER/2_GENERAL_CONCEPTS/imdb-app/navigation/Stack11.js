/* #2.11 Stack Navigator configuration */
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';
import colors from '../colors';

const NativeStack = createNativeStackNavigator();

const ScreenOne = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Two')}>
    <Text>Go to Two</Text>
  </TouchableOpacity>
);

const ScreenTwo = ({ navigation: { navigate } }) => (
  <TouchableOpacity onPress={() => navigate('Three')}>
    <Text>Go to Three</Text>
  </TouchableOpacity>
);
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

const Stack = () => (
  /* #2.11 screenOptions: <NS.Screen> 전체 적용 option
          options: 해당 <NS.Screen>에만 적용 option
  */
  // https://reactnavigation.org/docs/native-stack-navigator#options
  <NativeStack.Navigator
    screenOptions={{
      headerBackTitleVisible: false,
      headerShown: true,
      headerTintColor: colors.PRIMARY,
      presentation: 'modal', // default: 'card'
      animation: 'flip' | 'fade', // only iOS (me: 이렇게 '|'로 이어붙이면 Android에서는..?)
    }}
  >
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen name="Three" component={ScreenThree} />
  </NativeStack.Navigator>
);

export default Stack;
