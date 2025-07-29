import ImageInputList from "@/components/ImageInputList";
import Screen from "@/components/Screen";
import { useUser } from "@clerk/clerk-expo";
import React, { useState } from "react";
import { View } from "react-native";

const Home = () => {
  const { user } = useUser();

  const [imageUris, setImageUris] = useState<string[]>([]);

  const handleAdd = (uri: string | null) => {
    if (uri) {
      setImageUris([...imageUris, uri]);
    }
  };

  const handleRemove = (uri: string | null) => {
    // Added remove handler
    setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
  };

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

        <ImageInputList
          imageUris={imageUris}
          onAddImage={handleAdd}
          onRemoveImage={handleRemove}
        />
      </View>
    </Screen>
  );
};

export default Home;
