import CachedImage from "@/utils/CachedImage";
import { Image } from "expo-image";
import React, { Dispatch, SetStateAction } from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export type Category = {
  strCategory: string;
  strCategoryThumb: string;
  idCategory: string;
  strCategoryDescription: string;
};

type Props = {
  activeCategory: string;
  categories: Category[];
  handleChangeCategory: (category: string) => void;
};

const Categories = ({
  activeCategory,
  categories,
  handleChangeCategory,
}: Props) => {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((cat, index) => {
          let isActive = cat.strCategory == activeCategory;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <Pressable
              key={index}
              className="flex items-center mx-2.5 space-y-1"
              onPress={() => handleChangeCategory(cat.strCategory)}
            >
              <View className={`p-4 rounded-full ${activeButtonClass}`}>
                {Platform.OS === "android" ? (
                  <Image
                    source={{ uri: cat.strCategoryThumb }}
                    style={{ width: hp(6), height: hp(6) }}
                    className="rounded-full"
                  />
                ) : (
                  <CachedImage
                    uri={cat.strCategoryThumb}
                    style={{ width: hp(6), height: hp(6) }}
                    className="rounded-full"
                  />
                )}
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {cat.strCategory}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;
