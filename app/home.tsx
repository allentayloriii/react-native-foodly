import Categories, { Category } from "@/components/Categories";
import Meals, { Meal } from "@/components/Meals";
import axios, { AxiosError } from "axios";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Home = () => {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState<Category[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);

  useEffect(() => {
    getCatgories();
    getMeals();
    return () => {};
  }, []);

  const handleChangeCategory = (category: string) => {
    getMeals(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCatgories = async () => {
    try {
      const response = await axios.get(
        "https://themealdb.com/api/json/v1/1/categories.php"
      );
      if (response?.data) {
        setCategories(response.data.categories as Category[]);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.message);
    }
  };

  const getMeals = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      // console.log("got recipes: ", response.data);
      if (response?.data) {
        setMeals(response.data.meals as Meal[]);
      }
    } catch (error) {
      const err = error as AxiosError;
      console.log("error: ", err.message);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar and bell icon */}
        <View className="flex-row items-center justify-between mx-4 mb-10">
          <Image
            source={require("@/assets/images/icons8-male-user-100.png")}
            style={{ height: hp(5), width: hp(5.5) }}
          />
          <BellIcon size={hp(4)} color="gray" />
        </View>
        {/* greetings and punchline */}
        <View className="mx-4 mb-8 space-y-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600">
            Hello, Allen!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food,
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>
        {/* search bar */}
        <View className="mx-4 mb-8 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 pl-3 mb-1 text-base tracking-wide"
          />
          <View className="p-3 bg-white rounded-full">
            <MagnifyingGlassIcon
              size={hp(2.7)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>
        {/* categories */}
        <View className="mb-8">
          {categories.length > 0 && (
            <Categories
              categories={categories}
              activeCategory={activeCategory}
              handleChangeCategory={handleChangeCategory}
            />
          )}
        </View>
        {/* meals */}
        <View>
          <Meals categories={categories} meals={meals} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
