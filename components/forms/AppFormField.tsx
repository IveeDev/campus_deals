import { useFormikContext } from "formik";
import React from "react";
import { DimensionValue } from "react-native";
import InputField from "../InputField";
import ErrorMessage from "./ErrorMessage";

interface FormFieldProps {
  name: string;
  [key: string]: any;
  width?: DimensionValue;
}

const AppFormField = ({ name, width, ...otherProps }: FormFieldProps) => {
  const { setFieldTouched, handleChange, errors, touched } =
    useFormikContext<any>();
  return (
    <>
      <InputField
        label={otherProps.label}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
        width={width}
        {...otherProps}
      />
      {
        <ErrorMessage
          error={errors[name] as string}
          visible={touched[name] as boolean}
        />
      }
    </>
  );
};

export default AppFormField;
