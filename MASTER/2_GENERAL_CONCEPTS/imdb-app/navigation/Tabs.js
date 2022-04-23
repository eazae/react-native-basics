/* #2.5 Tab Navigation */
// using React Navigation package

// (https://reactnavigation.org/docs/bottom-tab-navigator/#api-definition)
// Step 1. import package
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Movies from '../screens/Movies';
import Search from '../screens/Search';
import Tv from '../screens/Tv';

// Step 2. create Navigator instance
const Tab = createBottomTabNavigator();

// Step 3. create Tab component to render
const Tabs = () => (
  <Tab.Navigator>
    {/* Step 4. give the Tab some Screens */}
    <Tab.Screen name="Movies" component={Movies} />
    <Tab.Screen name="Tv" component={Tv} />
    <Tab.Screen name="Search" component={Search} />
  </Tab.Navigator>
);

export default Tabs;
