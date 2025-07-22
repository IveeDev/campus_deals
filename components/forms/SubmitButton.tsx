import { useFormikContext } from "formik";
import React from "react";
import CustomButton from "../CustomButton";

const SubmitButton = ({
  title,
  isLoading,
}: {
  title: string;
  isLoading: boolean;
}) => {
  const { handleSubmit } = useFormikContext();
  return (
    <CustomButton
      onPress={() => handleSubmit()}
      title={title}
      isLoading={isLoading}
      className="mt-6"
    />
  );
};

export default SubmitButton;
