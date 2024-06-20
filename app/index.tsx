import { SafeAreaView, StyleSheet, Text } from "react-native";

const Index = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <Text>Welcome Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
