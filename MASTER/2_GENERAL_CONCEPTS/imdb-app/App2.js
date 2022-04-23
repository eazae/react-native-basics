import { useState } from 'react';
import { Image, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
// #2.2 Font Component
import * as Font from 'expo-font';
// installed default in CRNA proj.
import { Ionicons } from '@expo/vector-icons';
// # 2.2. Asset Component (for local asset files)
import { Asset } from 'expo-asset';

export default function App() {
  const [ready, setReady] = useState(false);

  /* AppLoading props */
  const onFinish = () => setReady(true);
  const startLoading = async () => {
    // put everything here that needs pre-loading
    // 10초 뒤에 Promise가 resolve 되게 해보자
    //// await new Promise((resolve) => setTimeout(resolve, 10000));

    /* #2.2 Expo Font API */
    // gives access to the 'font' file in "Ionicons"
    await Font.loadAsync(Ionicons.font);
    // 추가적으로, 아무 Font나 가져올 수 있음 (https://docs.expo.dev/versions/v44.0.0/sdk/font/#example-functions)
    // Load a font `Montserrat` from a static resource
    //// await Font.loadAsync({
    ////   Montserrat: require('./assets/fonts/Montserrat.ttf'),
    //// });

    /* #2.2 Expo Asset API */
    // local asset (in file-system) (https://docs.expo.dev/versions/v44.0.0/sdk/asset/#useassets)
    await Asset.loadAsync(require('./author.png'));
    // external asset (using URL) (https://reactnative.dev/docs/image#prefetch))
    await Image.prefetch('https://picsum.photos/200');

    //? 위 방식들의 문제점: preload하는 것마다 await 저 한 줄을 매번 선언해야 함
    // -> introduce 2 better ways to preload
    // -> replace this with 'hooks'
  };

  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }
  return <Text>Done Loading!</Text>;
}
