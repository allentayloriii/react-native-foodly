import Loading from "@/components/Loading";
import { Meal } from "@/components/Meals";
import CachedImage from "@/utils/CachedImage";
import axios, { AxiosError } from "axios";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import {
  ChevronLeftIcon,
  ClockIcon,
  FireIcon,
  Square3Stack3DIcon,
  UsersIcon,
} from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import Animated, { FadeIn, FadeInDown } from "react-native-reanimated";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import YoutubePlayer from "react-native-youtube-iframe";

type MealDetailType = Pick<Meal, "idMeal" | "strMeal"> & {
  strArea: string;
  strInstructions: string;
  strYoutube: string;
  [k: string]: string;
};

const MealDetail = () => {
  const item = useLocalSearchParams<Meal>();
  const [isFavorite, setIsFavorite] = useState(false);
  const [meal, setMeal] = useState<MealDetailType>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMealData(item.idMeal!);

    return () => {};
  }, []);

  const getMealData = async (id: string) => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      );
      console.log("got meal data: ", response.data);
      const meals: MealDetailType[] = response.data.meals as MealDetailType[];
      if (response?.data) {
        setMeal(meals[0]);
        setLoading(false);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.message);
    }
  };

  const ingredientsIndexes = (meal: MealDetailType) => {
    if (!meal) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (meal[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  const getYouTubeVideoId = (url: string) => {
    const regex = /[?&]v=([^&]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }

    return null;
  };

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
              sharedTransitionTag={item.strMeal}
            />
          ) : (
            <Image
              source={{ uri: item.strMealThumb }}
              style={{
                width: wp(98),
                height: hp(50),
                borderRadius: 20,
                marginTop: 4,
              }}
            />
          )}
        </View>
        {/* back button */}
        <Animated.View
          entering={FadeIn.delay(200).duration(1000)}
          className="absolute flex-row items-center justify-between w-full pt-14"
        >
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
        </Animated.View>
        {/* meal description */}
        {loading ? (
          <Loading size="large" className="mt-16" />
        ) : (
          <View className="flex justify-between px-4 pt-8 space-y-4">
            {/* name and area */}
            <Animated.View
              entering={FadeInDown.duration(700).springify().damping(12)}
              className="space-y-2"
            >
              <Text
                style={{ fontSize: hp(3) }}
                className="flex-1 font-bold text-neutral-700"
              >
                {meal?.strMeal}
              </Text>
              <Text
                style={{ fontSize: hp(2) }}
                className="flex-1 mb-4 font-medium text-neutral-500"
              >
                {meal?.strArea}
              </Text>
            </Animated.View>
            {/* misc */}
            <Animated.View
              entering={FadeInDown.delay(100)
                .duration(700)
                .springify()
                .damping(12)}
              className="flex-row justify-around"
            >
              <View className="flex p-2 rounded-full bg-amber-300">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="flex items-center justify-center bg-white rounded-full"
                >
                  <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    35
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Mins
                  </Text>
                </View>
              </View>
              <View className="flex p-2 rounded-full bg-amber-300">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="flex items-center justify-center bg-white rounded-full"
                >
                  <UsersIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    03
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Servings
                  </Text>
                </View>
              </View>
              <View className="flex p-2 rounded-full bg-amber-300">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="flex items-center justify-center bg-white rounded-full"
                >
                  <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  >
                    103
                  </Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Cal
                  </Text>
                </View>
              </View>
              <View className="flex p-2 rounded-full bg-amber-300">
                <View
                  style={{ height: hp(6.5), width: hp(6.5) }}
                  className="flex items-center justify-center bg-white rounded-full"
                >
                  <Square3Stack3DIcon
                    size={hp(4)}
                    strokeWidth={2.5}
                    color="#525252"
                  />
                </View>
                <View className="flex items-center py-2 space-y-1">
                  <Text
                    style={{ fontSize: hp(2) }}
                    className="font-bold text-neutral-700"
                  ></Text>
                  <Text
                    style={{ fontSize: hp(1.3) }}
                    className="font-bold text-neutral-700"
                  >
                    Easy
                  </Text>
                </View>
              </View>
            </Animated.View>

            {/* ingredients */}
            <Animated.View
              entering={FadeInDown.delay(200)
                .duration(700)
                .springify()
                .damping(12)}
              className="mt-5 space-y-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="flex-1 mb-3 font-bold text-neutral-700"
              >
                Ingredients
              </Text>
              <View className="ml-3 space-y-2">
                {ingredientsIndexes(meal!).map((i) => {
                  return (
                    <View key={i} className="flex-row space-x-4">
                      <View
                        style={{ height: hp(1.5), width: hp(1.5) }}
                        className="my-2 mr-5 rounded-full bg-amber-300"
                      />
                      <View className="flex-row pt-1 space-x-2">
                        <Text
                          style={{ fontSize: hp(1.7) }}
                          className="mr-2 font-extrabold text-neutral-700"
                        >
                          {meal[`strMeasure${i}`]}
                        </Text>
                        <Text
                          style={{ fontSize: hp(1.7) }}
                          className="font-medium text-neutral-600"
                        >
                          {meal[`strIngredient${i}`]}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </Animated.View>
            {/* instructions */}
            <Animated.View
              entering={FadeInDown.delay(300)
                .duration(700)
                .springify()
                .damping(12)}
              className="mt-5 space-y-4"
            >
              <Text
                style={{ fontSize: hp(2.5) }}
                className="flex-1 mb-3 font-bold text-neutral-700"
              >
                Instructions
              </Text>
              <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700">
                {meal?.strInstructions}
              </Text>
            </Animated.View>

            {/* reciep video */}
            {meal?.strYoutube && (
              <Animated.View
                entering={FadeInDown.delay(400)
                  .duration(700)
                  .springify()
                  .damping(12)}
                className="mt-5 space-y-4"
              >
                <Text
                  style={{ fontSize: hp(2.5) }}
                  className="flex-1 mb-3 font-bold text-neutral-700"
                >
                  Recipe Video
                </Text>
                <View>
                  <YoutubePlayer
                    videoId={getYouTubeVideoId(meal.strYoutube)!}
                    height={hp(30)}
                  />
                </View>
              </Animated.View>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default MealDetail;
