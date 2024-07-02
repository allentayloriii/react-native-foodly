import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";

export type Category = {
  strCategory: string;
  strCategoryThumb: string;
  idCategory: string;
  strCategoryDescription: string;
};

type Props = {
  activeCategory: string;
  categories: Category[];
  setActiveCategory: Dispatch<SetStateAction<string>>;
};

const Categories = ({
  activeCategory,
  categories,
  setActiveCategory,
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
              onPress={() => setActiveCategory(cat.strCategory)}
            >
              <View className={`p-4 rounded-full ${activeButtonClass}`}>
                <Image
                  source={{ uri: cat.strCategoryThumb }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
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

const styles = StyleSheet.create({
  container: {},
});
