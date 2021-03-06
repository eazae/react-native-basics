import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Search from '../screens/Search';
import Tv from '../screens/Tv';
import { useColorScheme } from 'react-native';
import colors from '../colors';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: isDark ? colors.BLACK : colors.WHITE }}
      screenOptions={{
        tabBarStyle: { backgroundColor: isDark ? colors.BLACK : colors.WHITE },
        tabBarActiveTintColor: isDark ? colors.PRIMARY : colors.BLACK,
        tabBarInactiveTintColor: isDark ? colors.DARK_GREY : colors.LIGHT_GREY,
        headerStyle: {
          backgroundColor: isDark ? colors.BLACK : colors.WHITE,
        },
        headerTitleStyle: {
          color: isDark ? colors.WHITE : colors.BLACK,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: -5,
        },
        /* #3.13 unmount 설정 */
        // 컴포넌트를 벗어나면(ex. 다른 탭 선택), 그 컴포넌트를 unmount(메모리에서 컴포넌트를 삭제) 시켜주는 설정
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name="film" size={size} color={color} />
          ),
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
