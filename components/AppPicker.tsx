import { PickerItemData } from "@/types/type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Button,
  FlatList,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import PickerItem from "./PickerItem";

interface AppPickerProps {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  placeholder: string;
  items: PickerItemData[];
  numberOfColumns?: number;
  width?: number | string;
  onSelectItem: (item: PickerItemData) => void;
  selectedItem: PickerItemData | null;
  [key: string]: any;
}

const AppPicker = ({
  icon,
  items,
  placeholder,
  onSelectItem,
  selectedItem,
  ...otherProps
}: AppPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View
          className=" bg-neutral-100 rounded-full border border-neutral-100 flex-row items-center p-3 my-2.5"
          {...otherProps}
        >
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={30}
              color="black"
              style={{ marginRight: 8 }}
            />
          )}
          <Text className="flex-1 text-black font-Jakarta">
            {selectedItem ? selectedItem.label : placeholder}
          </Text>
          <MaterialCommunityIcons name="chevron-down" size={30} color="black" />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="fade" transparent>
        <Button title="close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={items}
          keyExtractor={(item) => item.value.toString()}
          renderItem={({ item }) => (
            <PickerItem
              label={item.label}
              onPress={() => {
                onSelectItem(item);
                setModalVisible(false); // Close the modal after selection
              }}
            />
          )}
        />
      </Modal>
    </>
  );
};

export default AppPicker;
