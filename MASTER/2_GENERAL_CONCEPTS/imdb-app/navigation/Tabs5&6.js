/* #2.5 Tab Navigation */
// using React Navigation package

// (https://reactnavigation.org/docs/bottom-tab-navigator/#api-definition)
// Step 1. import package
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import Movies from '../screens/Movies';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

// Step 2. create Navigator instance
const Tab = createBottomTabNavigator();

// Step 3. create Tab component to render
const Tabs = () => (
  /* #2.6 Configure Navigation */
  // configurations are based on 'props' (React component이므로) & 'options'
  // ex. props) 'initialRouteName': 첫 번째로 렌더링 될 route의 name
  //     options) 'screenOptions': 모든 화면에 적용될 option을 담은 prop
  <Tab.Navigator
    initialRouteName="Search"
    screenOptions={{
      tabBarLabelStyle: {
        backgroundColor: 'blue',
      },
      tabBarActiveTintColor: 'orange',
    }}
  >
    {/* Step 4. give the Tab some Screens */}
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen
      name="Tv"
      component={Tv}
      // options) 'options': 해당 특정 화면에만 적용될 option을 담은 prop
      options={{
        tabBarLabelStyle: {
          backgroundColor: 'red',
        },
        tabBarBadge: 5,
        headerRight: () => (
          <View>
            <Text>Hello</Text>
          </View>
        ),
      }}
    />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;
