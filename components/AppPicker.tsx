import { PickerItemData } from "@/types/type";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Button,
  DimensionValue,
  FlatList,
  Modal,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PickerItem from "./PickerItem";

interface AppPickerProps {
  icon?: keyof typeof MaterialCommunityIcons.glyphMap;
  placeholder: string;
  items: PickerItemData[];
  numberOfColumns?: number;
  onSelectItem: (item: PickerItemData) => void;
  PickerItemComponent?: React.ComponentType<{
    item: PickerItemData;
    label: string;
    onPress: () => void;
  }>;
  selectedItem: PickerItemData | null;
  width?: DimensionValue;
  [key: string]: any;
}

const AppPicker = ({
  icon,
  items,
  numberOfColumns = 1,
  onSelectItem,
  PickerItemComponent = PickerItem,
  placeholder,
  selectedItem,
  width = "100%",
  ...otherProps
}: AppPickerProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View
          className=" bg-neutral-100 rounded-full border border-neutral-100 flex-row items-center p-3 my-2.5"
          style={{ width }}
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
          <MaterialCommunityIcons name="chevron-down" size={30} color="gray" />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <SafeAreaView className="flex-1 bg-white">
          <View className="p-4">
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
          <FlatList
            data={items}
            keyExtractor={(item) => item.value.toString()}
            numColumns={numberOfColumns}
            contentContainerStyle={{ paddingBottom: 20 }}
            renderItem={({ item }) => (
              <PickerItemComponent
                item={item}
                label={item.label}
                onPress={() => {
                  onSelectItem(item);
                  setModalVisible(false);
                }}
              />
            )}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default AppPicker;
