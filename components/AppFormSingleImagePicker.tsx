import { useFormikContext } from "formik";
import React from "react";
import ImageInput from "./ImageInput";
import ErrorMessage from "./forms/ErrorMessage";

const AppFormSingleImagePicker = ({ name }: { name: string }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext<any>();
  const imageUri = values[name];

  const handleChange = (uri: string | null) => {
    setFieldValue(name, uri || "");
  };
  return (
    <>
      <ImageInput imageUri={imageUri} onChangeImage={handleChange} />
      <ErrorMessage
        error={errors[name] as string}
        visible={touched[name] as boolean}
      />
    </>
  );
};

export default AppFormSingleImagePicker;
