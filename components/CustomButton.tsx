/* eslint-disable prettier/prettier */
import { ButtonProps } from "@/types/type";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
  switch (variant) {
    case "secondary":
      return "bg-secondary";
    case "danger":
      return "bg-danger-500";
    case "outline":
      return "bg-transparent border-neutral-gray border-[0.5px]";
    case "success":
      return "bg-success-500";
    default:
      return "bg-secondary";
  }
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
  switch (variant) {
    case "primary":
      return "text-neutral-dark";
    case "secondary":
      return "text-neutral-white";
    case "danger":
      return "text-neutral-white";
    case "success":
      return "text-neutral-white";
    default:
      return "text-neutral-white";
  }
};

const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  isLoading = false,
  ...props
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={isLoading ? undefined : onPress}
      disabled={isLoading}
      className={`rounded-full flex flex-row items-center justify-center p-3 shadow-md shadow-neutral-400/70 ${getBgVariantStyle(bgVariant)} ${className}`}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <>
          {IconLeft && <IconLeft className="mr-2" />}
          <Text
            className={`text-lg font-JakartaBold ${getTextVariantStyle(textVariant)}`}
          >
            {title}
          </Text>
          {IconRight && <IconRight className="ml-2" />}
        </>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;
