import { View, Text, ActivityIndicator } from "react-native";

type Props = {
  size: number | "small" | "large" | undefined;
};

const Loading = ({ size, ...rest }: Props) => {
  return (
    <View className="flex justify-center flex-1">
      <ActivityIndicator size={size} />
    </View>
  );
};

export default Loading;
