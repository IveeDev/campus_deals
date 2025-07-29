import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect } from "react";
import { Alert, Image, TouchableWithoutFeedback, View } from "react-native";

interface ImageInputProps {
  imageUri: string | null;
  onChangeImage: (uri: string | null) => void;
}

const ImageInput = ({ imageUri, onChangeImage }: ImageInputProps) => {
  useEffect(() => {
    requestPermission();
  }, []);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable permission");
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "images",
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled) onChangeImage(result.assets[0].uri);
    } catch (error) {
      console.log("Error reading image");
    }
  };

  const handlePress = () => {
    if (!imageUri) selectImage();
    else
      Alert.alert("Delete", "Are you sure you want to delete", [
        {
          text: "Yes",
          onPress: () => onChangeImage(null),
        },
        { text: "No" },
      ]);
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View className="items-center justify-center w-[100px] h-[100px] bg-neutral-200 rounded-2xl overflow-hidden">
        {!imageUri && (
          <MaterialCommunityIcons name="camera" size={40} color={"#555555"} />
        )}
        {imageUri && (
          <Image
            className="w-full h-full"
            source={{ uri: imageUri }}
            resizeMode="cover"
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImageInput;
