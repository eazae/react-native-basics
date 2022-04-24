/* #2.7 Light/Dark mode (Color scheme) */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Movies from '../screens/Movies';
import Search from '../screens/Search';
import Tv from '../screens/Tv';
// #2.7 useColorScheme() Hook
// (https://reactnative.dev/docs/usecolorscheme)
import { useColorScheme } from 'react-native';
import colors, { PRIMARY_COLOR } from '../colors';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  /* get color scheme & subscribe to color scheme updates */
  //// const colorScheme = useColorScheme();
  //// console.log(colorScheme); // check how this updates: "light" | "dark"
  const isDark = useColorScheme() === 'dark'; // "true" | "false" 로 받아오자

  return (
    <Tab.Navigator
    /* ver 1. change style according to current mode */
    //? 문제점) color를 매번 hex코드로 정의? (BAD) => Object로 따로 뗴어두자! (see '../colors.js')
    // screenOptions={{
    //   tabBarStyle: { backgroundColor: isDark ? '#1e272e' : 'white' },
    //   tabBarActiveTintColor: isDark ? '#ffc048' : '#1e272e',
    //   tabBarInactiveTintColor: isDark ? '#d2d2d2' : '#808e9b',
    //   headerStyle: {
    //     backgroundColor: isDark ? '#1e272e' : 'white',
    //   },
    //   headerTitleStyle: {
    //     color: isDark ? 'white' : '#1e272e',
    //   },
    // }}
    /* ver 2. color.js */
    //? +) 다크모드를 더 빠르게 사용하고 싶다면?
    // screenOptions={{
    //   // i) Object로 가져오는 방식
    //   tabBarStyle: { backgroundColor: isDark ? colors.BLACK : colors.WHITE },
    //   // ii) constant로 가져오는 방식
    //   tabBarActiveTintColor: isDark ? PRIMARY_COLOR : colors.BLACK,
    //   tabBarInactiveTintColor: isDark ? colors.DARK_GREY : colors.LIGHT_GREY,
    //   headerStyle: {
    //     backgroundColor: isDark ? colors.BLACK : colors.WHITE,
    //   },
    //   headerTitleStyle: {
    //     color: isDark ? colors.WHITE : colors.BLACK,
    //   },
    // }}
    /* ver 3. themes: 다크모드를 빠르게 사용 */
    // <NavigationContainer>에 넘겨주는 prop -> see App8.js
    >
      <Tab.Screen name="Movies" component={Movies} />
      <Tab.Screen name="Tv" component={Tv} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
};

export default Tabs;
