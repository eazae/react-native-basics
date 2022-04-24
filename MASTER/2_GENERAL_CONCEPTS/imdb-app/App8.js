import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { useAssets } from 'expo-asset';
import Tabs from './navigation/Tabs8';

// #2.8 themes: import 'DarkTheme', 'DefaultTheme'
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';

export default function App() {
  const [ready, setReady] = useState(false);
  const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font)); // [Font.loadAsync(Ionicons.font), Font.loadAsync(Ionicons.font), ...]

  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };

  /* themes */
  // Tabs.js에서 뒀던 hook을 여기(App.js)로 옮기자
  // (주의: 아래의 if문 이전에 배치해야 함)
  const isDark = useColorScheme() === 'dark';

  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }
  return (
    //* 'theme' prop: RN가 기본으로 제공해주는 것. 간편하게 적용가능
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Tabs />
    </NavigationContainer>
  );
}
