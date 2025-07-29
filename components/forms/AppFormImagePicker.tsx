import { useFormikContext } from "formik";
import React from "react";
import ImageInputList from "../ImageInputList";
import ErrorMessage from "./ErrorMessage";

const AppFormImagePicker = ({ name }: { name: string }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext<any>();
  const imageUris = values[name];

  const handleAdd = (uri: string | null) => {
    if (uri) {
      setFieldValue(name, [...imageUris, uri]);
    }
  };

  const handleRemove = (uri: string | null) => {
    // Added remove handler
    setFieldValue(
      name,
      imageUris.filter((imageUri: string) => imageUri !== uri)
    );
  };
  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <ErrorMessage
        error={errors[name] as string}
        visible={touched[name] as boolean}
      />
    </>
  );
};

export default AppFormImagePicker;
