import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

const Categories = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsVerticalScrollIndicator={false}
        className="space-x-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        <Text>Categories</Text>
      </ScrollView>
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {},
});
