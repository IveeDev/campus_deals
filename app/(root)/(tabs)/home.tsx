import ImageInput from "@/components/ImageInput";
import Screen from "@/components/Screen";
import { useUser } from "@clerk/clerk-expo";
import React, { useState } from "react";
import { View } from "react-native";

const Home = () => {
  const { user } = useUser();

  const [imageUri, setImageUri] = useState<string | null>(null);

  // const selectImage = async () => {
  //   try {
  //     const result = await ImagePicker.launchImageLibraryAsync({
  //       mediaTypes: "images",
  //       allowsEditing: true,
  //       aspect: [1, 1],
  //       quality: 0.8,
  //     });
  //     if (!result.canceled) setImageUri(result.assets[0].uri);
  //   } catch (error) {
  //     console.log("Error reading image");
  //   }
  // };
  return (
    <Screen>
      <View>
        {/* <Text className="font-JakartaBold">Home</Text>
        <SignedIn>
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        </SignedIn>
        <SignedOut>
          <Link href="/(auth)/sign-in">
            <Text>Sign in</Text>
          </Link>
          <Link href="/(auth)/sign-up">
            <Text>Sign up</Text>
          </Link>
        </SignedOut> */}

        <ImageInput
          imageUri={imageUri}
          onChangeImage={(uri) => setImageUri(uri)}
        />
      </View>
    </Screen>
  );
};

export default Home;
