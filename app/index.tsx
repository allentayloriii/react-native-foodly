import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";
import { useEffect } from "react";
import { router } from "expo-router";

const Index = () => {
  const ring1Padding = useSharedValue(0);
  const ring2Padding = useSharedValue(0);

  useEffect(() => {
    ring1Padding.value = 0;
    ring2Padding.value = 0;
    setTimeout(
      () => (ring1Padding.value = withSpring(ring1Padding.value + hp(5))),
      100
    );
    setTimeout(
      () => (ring2Padding.value = withSpring(ring2Padding.value + hp(5.5))),
      300
    );

    setTimeout(() => {
      router.replace("/home");
    }, 2500);
  }, []);

  return (
    <SafeAreaView className="items-center justify-center flex-1 space-y-10 bg-amber-500">
      <StatusBar style="light" />
      {/* logo image with rings */}
      <Animated.View
        className="rounded-full bg-white/20"
        style={{ padding: ring2Padding }}
      >
        <Animated.View
          className="rounded-full bg-white/20"
          style={{ padding: ring1Padding }}
        >
          <Image
            source={require("@/assets/images/ramen.png")}
            style={styles.image}
          />
        </Animated.View>
      </Animated.View>
      {/* title and punchline */}
      <View className="flex items-center mt-10 space-y-2">
        <Text
          style={{ fontSize: hp(7) }}
          className="text-6xl font-bold tracking-widest text-white"
        >
          Foodly
        </Text>
        <Text
          style={{ fontSize: hp(2) }}
          className="text-lg font-medium tracking-widest text-white"
        >
          Food Above All Else
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: hp(20),
    height: hp(20),
  },
});

export default Index;
