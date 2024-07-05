import CachedImage from "@/utils/CachedImage";
import { Image } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Platform, Pressable, ScrollView, View } from "react-native";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { router } from "expo-router";

const MealDetail = () => {
  const item = useLocalSearchParams<{
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
  }>();
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      >
        <StatusBar style={"light"} />
        {/* meal image */}
        <View className="flex-row justify-center">
          {Platform.OS !== "android" ? (
            <CachedImage
              uri={item.strMealThumb!}
              style={{
                width: wp(98),
                height: hp(50),
                borderRadius: 53,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                marginTop: 4,
              }}
            />
          ) : (
            <Image
              source={{ uri: item.strMealThumb }}
              style={{
                width: wp(98),
                height: hp(50),
                borderRadius: 53,
                borderBottomLeftRadius: 40,
                borderBottomRightRadius: 40,
                marginTop: 4,
              }}
            />
          )}
        </View>
        {/* back button */}
        <View className="absolute flex-row items-center justify-between w-full pt-14">
          <Pressable
            className="p-2 ml-5 bg-white rounded-full"
            onPress={() => {
              router.back();
            }}
          >
            <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color="#fbbf24" />
          </Pressable>
          <Pressable
            className="p-2 mr-5 bg-white rounded-full"
            onPress={() => setIsFavorite(!isFavorite)}
          >
            <HeartIcon
              size={hp(3.5)}
              strokeWidth={4.5}
              color={isFavorite ? "red" : "grey"}
            />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default MealDetail;
