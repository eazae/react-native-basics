import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
// import Movies from '../screens/Movies1';
// import Movies from '../screens/Movies13';
import Movies from '../screens/Movies15';
import Search from '../screens/Search';
import Tv from '../screens/Tv';
import { useColorScheme } from 'react-native';
import colors, { PRIMARY_COLOR } from '../colors';
import { Ionicons } from '@expo/vector-icons';
import Stack from './Stack';
import Movies12 from '../screens/Movies12';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: isDark ? colors.BLACK : colors.WHITE },
        tabBarActiveTintColor: isDark ? PRIMARY_COLOR : colors.BLACK,
        tabBarInactiveTintColor: isDark ? colors.DARK_GREY : colors.LIGHT_GREY,
        // headerStyle: {
        //   backgroundColor: isDark ? colors.BLACK : colors.WHITE,
        // },
        // headerTitleStyle: {
        //   color: isDark ? colors.WHITE : colors.BLACK,
        // },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        //// component={Movies}
        /* #2.12 Step i-2. Render the 'Stack Navigation' */
        //? 단점) 어떤 Screen들에서는, Tab을 숨기고 싶을수도 있음
        // component={Stack}
        /* #2.12 Step ii-3. Make Screen jump between Nav.s (see "Movies12.js") */
        component={Movies12}
        options={{
          // (Step i-2) hide the header for Tab Nav.
          //// headerShown: false,
          tabBarIcon: ({ focused, color, size }) => <Ionicons name="film" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
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
