import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useAssets } from 'expo-asset';
// # 2.5 React navigation
import { NavigationContainer } from '@react-navigation/native';
import Tabs from './navigation/Tabs';

export default function App() {
  // const [assets] = useAssets([require('./author.png')]); // Asset[] | undefined
  // const [fonts] = Font.useFonts([Ionicons.font]);
  // if (!assets || !fonts) {
  //   return <AppLoading />;
  // }
  /* #2.5 React Navigation */
  // see folder ./navigation, ./screens

  //! <RULE> to use react-navigation component, we always have to render <NavigationContainer> first!
  return (
    <NavigationContainer>
      {/* place the Tab Navigation component we made */}
      <Tabs />
    </NavigationContainer>
  );
}
