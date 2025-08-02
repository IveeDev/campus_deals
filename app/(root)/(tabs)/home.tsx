import Screen from "@/components/Screen";
import { useUser } from "@clerk/clerk-expo";
import React from "react";
import { View } from "react-native";

const Home = () => {
  const { user } = useUser();

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
      </View>
    </Screen>
  );
};

export default Home;
