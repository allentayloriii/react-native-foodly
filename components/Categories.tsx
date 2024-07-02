import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { Dispatch, SetStateAction } from "react";
import { categoryData } from "@/constants/index";
import { Image } from "expo-image";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

type Props = {
  activeCategory: string;
  setActiveCategory: Dispatch<SetStateAction<string>>;
};

const Categories = ({ activeCategory, setActiveCategory }: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categoryData.map((cat, index) => {
          let isActive = cat.name == activeCategory;
          let activeButtonClass = isActive ? "bg-amber-400" : "bg-black/10";
          return (
            <Pressable
              key={index}
              className="flex items-center space-y-1"
              onPress={() => setActiveCategory(cat.name)}
            >
              <View className={`p-4 rounded-full ${activeButtonClass}`}>
                <Image
                  source={{ uri: cat.image }}
                  style={{ width: hp(6), height: hp(6) }}
                  className="rounded-full"
                />
              </View>
              <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {},
});
