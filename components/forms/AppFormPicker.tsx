import { PickerItemData } from "@/types/type";
import { useFormikContext } from "formik";
import React from "react";
import { DimensionValue } from "react-native";
import AppPicker from "../AppPicker";
import ErrorMessage from "./ErrorMessage";

interface AppFormPickerProps {
  items: PickerItemData[];
  name: string;
  numberOfColumns: number;
  PickerItemComponent?: React.ComponentType<{
    item: PickerItemData;
    label: string;
    onPress: () => void;
  }>;
  placeholder: string;
  width?: DimensionValue;
}

const AppFormPicker = ({
  items,
  name,
  numberOfColumns,
  placeholder,
  PickerItemComponent,
  width,
}: AppFormPickerProps) => {
  const { errors, setFieldValue, touched, values } = useFormikContext<any>();
  return (
    <>
      <AppPicker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
      />
      <ErrorMessage
        error={errors[name] as string}
        visible={touched[name] as boolean}
      />
    </>
  );
};

export default AppFormPicker;
