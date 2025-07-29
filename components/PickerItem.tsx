import { PickerItemProps } from "@/types/type";
import React from "react";
import { TouchableOpacity } from "react-native";
import AppText from "./AppText";

const PickerItem = ({ label, onPress }: PickerItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="px-4 py-2">
      <AppText className="p-4 text-black font-JakartaMedium">{label}</AppText>
    </TouchableOpacity>
  );
};

export default PickerItem;
