import { SafeAreaView, StyleSheet, Text, View } from "react-native";

const WelcomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
        <Text>Welcome Screen</Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
