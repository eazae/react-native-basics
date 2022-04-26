import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Tabs from './navigation/Tabs';
import Root from './navigation/Root';
import { NavigationContainer } from '@react-navigation/native';
// #2.15 import 'ThemeProvider'
import styled, { ThemeProvider } from 'styled-components/native';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from './styled';

export default function App() {
  const [ready, setReady] = useState(false);
  const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };

  // Step 2. Tabs.js에 있던 부분 -> App.js로 끌어올려오자
  // (장점: 이 hook을 한 번만 실행해도 되게끔 해준다)
  const isDark = useColorScheme() === 'dark';

  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }

  /* #2.15 style-component theme */
  // Step 3. <ThemeProvider>로 감싸자
  // -> 하위에 있는 component들은 props.theme.(속성name)에 접근이 가능함! (see Movies15.js)
  return (
    // Step 4. 'theme' prop
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
