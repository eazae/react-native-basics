import { useState } from 'react';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Root from './navigation/Root';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from './styled';
// #3.12 import for React-Query
import { QueryClient, QueryClientProvider } from 'react-query';

export default function App() {
  const [ready, setReady] = useState(false);
  const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

  const onFinish = () => setReady(true);
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };

  const isDark = useColorScheme() === 'dark';

  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }

  /* #3.12 React Query */
  // 각 API 호출마다 생성한 state들과,
  // fetch()문, await Promise.all()이 매우 간략해질 수 있음
  // Step 1. create QueryClient instanse
  const queryClient = new QueryClient();

  return (
    // Step 2. wrap Application with <QueryClientProvider>
    // & 'client' prop에 QueryClient instanse를 넘김
    // Step 3. (see ~/api.ts)
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
