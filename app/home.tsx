import { SafeAreaView, StyleSheet, Text } from "react-native";

const Home = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <Text>Home Screen</Text>
    </SafeAreaView>
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
