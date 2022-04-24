import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Tabs from './navigation/Tabs8';
import { NavigationContainer } from '@react-navigation/native';
// # 2.10 Stack Navigator component
import Stack from './navigation/Stack';

export default function App() {
  const [ready, setReady] = useState(false);
  const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font)); // [Font.loadAsync(Ionicons.font), Font.loadAsync(Ionicons.font), ...]

  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };

  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }
  return (
    <NavigationContainer>
      {/* //// <Tabs /> */}
      {/* #2.10 Stack Navigation */}
      <Stack />
    </NavigationContainer>
  );
}
