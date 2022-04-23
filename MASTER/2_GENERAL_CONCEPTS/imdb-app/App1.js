import { useState } from 'react';
import { Image, Text } from 'react-native';
// #2.1 AppLoading Expo Component
import AppLoading from 'expo-app-loading';

export default function App() {
  const [ready, setReady] = useState(false);

  /* AppLoading props */
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    // put everything here that needs pre-loading
    // 10초 뒤에 Promise가 resolve 되게 해보자
    await new Promise((resolve) => setTimeout(resolve, 10000));
  };

  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }
  return <Text>Done Loading!</Text>;
}
