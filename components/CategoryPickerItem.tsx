import React from "react";
import { TouchableOpacity, View } from "react-native";
import AppText from "./AppText";
import Icon from "./Icon";

interface CategoryPickerItemProps {
  item: {
    label: string;
    value: number;
    backgroundColor?: string;
    icon?: any;
  };
  onPress: () => void;
}

const CategoryPickerItem = ({ item, onPress }: CategoryPickerItemProps) => {
  return (
    <View className="px-[20px] py-[15px] items-center flex-1 w-1/3">
      <TouchableOpacity onPress={onPress}>
        <Icon
          backgroundColor={item.backgroundColor}
          name={item.icon || "apps"} // default icon if none provided
          size={80}
        />
      </TouchableOpacity>
      <AppText className="mt-1 text-center font-JakartaMedium">
        {item.label}
      </AppText>
    </View>
  );
};

export default CategoryPickerItem;
