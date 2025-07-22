import React from "react";
import { Text, View } from "react-native";

interface ErrorMessageProps {
  error?: string;
  visible?: boolean;
}

const ErrorMessage = ({ error, visible }: ErrorMessageProps) => {
  if (!error || !visible) return null;
  return (
    <View>
      <Text className="text-danger-500 font-JakartaSemiBold">{error}</Text>
    </View>
  );
};

export default ErrorMessage;
