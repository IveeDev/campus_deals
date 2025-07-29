import { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Screen = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <SafeAreaView className={`flex-1 bg-white ${className || ""}`}>
      <View className="flex-1">{children}</View>
    </SafeAreaView>
  );
};

export default Screen;
