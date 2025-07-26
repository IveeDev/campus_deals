import React from "react";
import { Text, TextProps } from "react-native";

interface AppTextProps extends TextProps {
  children: React.ReactNode;
  className?: string;
}

const AppText = ({ children, className, ...otherProps }: AppTextProps) => {
  return (
    <Text className={className} {...otherProps}>
      {children}
    </Text>
  );
};

export default AppText;
