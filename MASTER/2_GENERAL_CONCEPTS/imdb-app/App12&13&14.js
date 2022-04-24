import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Tabs from './navigation/Tabs';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigation/Root';

export default function App() {
  const [ready, setReady] = useState(false);
  const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };

  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }
  /* #2.12 Combine Tab Nav & Stack Nav */
  // [2 가지 방식 존재]
  // i) Tabs Nav. 안에 Stack Nav.를 render (see 'navigation/Tabs.js')
  //* ii) Root Nav.를 둬서 그 안에 2개의 screen에 각각의 Nav를 배치 (see 'navigation/Root.js') - freguently used
  return (
    <NavigationContainer>
      {/* Step i-1. Render the 'Tabs Navigation' */}
      {/* <Tabs /> */}
      {/* Step ii-1. Render a 'Root Navigation' */}
      <Root />
    </NavigationContainer>
  );
}
