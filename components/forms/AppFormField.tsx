import { useFormikContext } from "formik";
import React from "react";
import ErrorMessage from "./ErrorMessage";
import InputField from "../InputField";

interface FormFieldProps {
  name: string;
  [key: string]: any;
}

const AppFormField = ({ name, ...otherProps }: FormFieldProps) => {
  const { setFieldTouched, handleChange, errors, touched } =
    useFormikContext<any>();
  return (
    <>
      <InputField
        label={otherProps.label}
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleChange(name)}
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
