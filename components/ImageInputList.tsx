import React, { useRef } from "react";
import { ScrollView, View } from "react-native";
import ImageInput from "./ImageInput";

interface ImageInputListProps {
  imageUris?: string[];
  onRemoveImage: (uri: string | null) => void;
  onAddImage: (uri: string | null) => void;
}

const ImageInputList = ({
  imageUris = [],
  onRemoveImage,
  onAddImage,
}: ImageInputListProps) => {
  const scrollView = useRef<ScrollView>(null);

  return (
    <View>
      <ScrollView
        ref={scrollView}
        horizontal
        onContentSizeChange={() =>
          scrollView.current?.scrollToEnd({ animated: true })
        }
      >
        <View className="flex flex-row">
          {imageUris.map((uri) => (
            <View key={uri} className="mr-3">
              <ImageInput
                imageUri={uri}
                onChangeImage={() => onRemoveImage(uri)}
              />
            </View>
          ))}
          <ImageInput
            imageUri={null}
            onChangeImage={(uri) => onAddImage(uri)}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ImageInputList;
