import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ViewProps } from "react-native";

import Animated from "react-native-reanimated";

type Props = {
  uri: string;
  [x: string]: any;
};

const CachedImage = ({ uri, ...rest }: Props) => {
  const [cachedSource, setCachedSource] = useState<{ uri: string }>();

  useEffect(() => {
    const getCachedImage = async () => {
      try {
        const cachedImageData = await AsyncStorage.getItem(uri);

        if (cachedImageData) {
          setCachedSource({ uri: cachedImageData });
        } else {
          const response = await fetch(uri);
          const imageBlob = await response.blob();
          const base64Data: string = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              resolve(reader.result as string);
            };
          });
          await AsyncStorage.setItem(uri, base64Data);
          setCachedSource({ uri: base64Data });
        }
      } catch (error: unknown) {
        console.error("Error caching image: ", error);
        setCachedSource({ uri });
      }
    };

    getCachedImage();
    return () => {};
  }, []);

  return <Animated.Image source={cachedSource} {...rest} />;
};

export default CachedImage;
