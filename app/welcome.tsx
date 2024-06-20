import { SafeAreaView, StyleSheet, Text } from "react-native";

const WelcomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome Screen</Text>
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
