import { useState } from 'react';
import { Image, Text } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
// # 2.3.2 useAsset Hook
import { useAssets } from 'expo-asset';

export default function App() {
  const [ready, setReady] = useState(false);

  /* Font, Asset preload functions */
  const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font)); // [Font.loadAsync(Ionicons.font), Font.loadAsync(Ionicons.font), ...]
  const loadImages = (images) =>
    images.map((image) => {
      // since there are 2 types of image assets, preload by type
      if (typeof image === 'string') {
        return Image.prefetch(image); // external image url
      } else {
        return Asset.loadAsync(image); // local image file
      }
    });

  const onFinish = () => setReady(true);
  const startLoading = async () => {
    //? 아래 방식의 문제점: preload하는 것마다 await 저 한 줄을 매번 선언해야 함
    // -> introduce 2 better ways to preload
    // - 2.3.1 pack into Promise array
    // - 2.3.2 replace this with 'hooks'
    //// await Font.loadAsync(Ionicons.font);
    //// await Asset.loadAsync(require('./author.png'));
    //// await Image.prefetch('https://picsum.photos/200');

    /* #2.3.1 Better way of preloading 1 */
    const fonts = loadFonts([Ionicons.font, require(''), require('')]);
    const images = loadImages([require('./author.png'), 'https://picsum.photos/200']);
    // 둘 다 Promise 객체들의 배열 형태
    console.log(fonts);
    console.log(images);

    // await for all the Promises in param
    await Promise.all([...fonts, ...images]);
  };

  if (!ready) {
    return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error} />;
  }
  return <Text>Done Loading!</Text>;

  // ==================================================================================

  /* #2.3.2 Better way of preloading 2 */
  // useAssets() Hook 사용
  const [assets] = useAssets([require('./author.png')]); // Asset[] | undefined
  const [fonts] = Font.useFonts([Ionicons.font]);
  //! 단점: - 원격이미지(Image.prefetch()) 불러오지 X
  //!       - 로딩함수('startLoading()')에서는 무엇이든지 넣을 수 있었지만, hook을 사용하게 되면 딱 그 hook 동작밖에 못하고 있음

  if (!assets || !fonts) {
    return <AppLoading />;
  }
}
