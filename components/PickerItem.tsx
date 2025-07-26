import React from "react";
import { TouchableOpacity } from "react-native";
import AppText from "./AppText";

interface PickerItemProps {
  label: string;
  onPress: () => void;
}

const PickerItem = ({ label, onPress }: PickerItemProps) => {
  return (
    <TouchableOpacity onPress={onPress} className="px-4 py-2">
      <AppText className="p-4 text-black font-JakartaMedium">{label}</AppText>
    </TouchableOpacity>
  );
};

export default PickerItem;
