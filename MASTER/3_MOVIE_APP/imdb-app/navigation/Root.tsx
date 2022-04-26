/* #2.12 Step ii-2. Root Navigator component */
// Stack Navigator로 구현
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Stack from './Stack';
import Tabs from './Tabs';

const Nav = createNativeStackNavigator();

const Root = () => (
  //  header가 2개이므로 하나를 숨기자
  <Nav.Navigator screenOptions={{ headerShown: false, presentation: 'modal' }}>
    <Nav.Screen name="Tabs" component={Tabs} />
    <Nav.Screen name="Stack" component={Stack} />
    {/* //? How to jump *between Navigators"? -> see Movies12.js */}
  </Nav.Navigator>
);

export default Root;
