import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Movies from '../screens/Movies';
import Search from '../screens/Search';
import Tv from '../screens/Tv';
import { useColorScheme } from 'react-native';
import colors, { PRIMARY_COLOR } from '../colors';
// #2.8 icons
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: isDark ? colors.BLACK : colors.WHITE },
        tabBarActiveTintColor: isDark ? PRIMARY_COLOR : colors.BLACK,
        tabBarInactiveTintColor: isDark ? colors.DARK_GREY : colors.LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? colors.BLACK : colors.WHITE,
        },
        headerTitleStyle: {
          color: isDark ? colors.WHITE : colors.BLACK,
        },
        // additional
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
        },
      }}
    >
      {/* #2.8 Tab Bar Icons
      (https://reactnavigation.org/docs/bottom-tab-navigator/#tabbaricon) */}
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            console.log(focused, color, size);
            // (https://icons.expo.fyi/Ionicons/film)
            // size, color를 임의로 바꾸고 있지 않음. 위의 'screenOptions'에서 넘겨주기 때문에
            return <Ionicons name="film" size={size} color={color} />;
          },
        }}
      />
      {/* 나머지도 icon 적용 */}
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            // focus 여부에 따라서 icon 변경도 가능하겠다
            <Ionicons name={focused ? 'tv' : 'tv-outline'} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="search" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
