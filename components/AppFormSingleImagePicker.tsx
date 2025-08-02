import { useFormikContext } from "formik";
import React from "react";
import { Text, View } from "react-native";
import ImageInput from "./ImageInput";
import ErrorMessage from "./forms/ErrorMessage";

interface Props {
  name: string;
  label?: string;
}

const AppFormSingleImagePicker = ({ name, label }: Props) => {
  const { errors, setFieldValue, touched, values } = useFormikContext<any>();
  const imageUri = values[name];

  const handleChange = (uri: string | null) => {
    setFieldValue(name, uri || "");
  };
  return (
    <View style={{ marginVertical: 8 }}>
      {/* {" "} */}
      {label && (
        <Text className="mb-3 text-lg font-JakartaSemiBold">{label}</Text>
      )}
      <ImageInput imageUri={imageUri} onChangeImage={handleChange} />
      <ErrorMessage
        error={errors[name] as string}
        visible={touched[name] as boolean}
      />
    </View>
  );
};

export default AppFormSingleImagePicker;
