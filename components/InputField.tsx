import { InputFieldProps } from "@/types/type";
import React from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  width = "100%",
  ...props
}: InputFieldProps) => {
  return (
    <TouchableWithoutFeedback>
      <View className="my-2" style={{ width }}>
        {label && (
          <Text className={`text-lg font-JakartaSemiBold mb-3`}>{label}</Text>
        )}
        <View
          className={`flex flex-row items-center bg-neutral-100 focus:border-primary-500  rounded-full border border-neutral-100 overflow-hidden ${containerStyle} ${className}`}
        >
          {icon && (
            <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
          )}

          <TextInput
            className={`py-4 flex-1 px-4 font-JakartaSemiBold text-[15px] ${inputStyle} text-left`}
            secureTextEntry={secureTextEntry}
            {...props}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default InputField;
