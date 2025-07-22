import { AppForm, AppFormField, SubmitButton } from "@/components/forms";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .label("Email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .label("Password")
    .required("Password is required"),
});

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      if (!isLoaded) return;
      setIsSigningIn(true);

      try {
        const signInAttempt = await signIn.create({
          identifier: email,
          password: password,
        });

        if (signInAttempt.status === "complete") {
          await setActive({ session: signInAttempt.createdSessionId });
          router.replace("/(root)/(tabs)/home");
        } else {
          console.log(JSON.stringify(signInAttempt, null, 2));
          Alert.alert("Error", "Log in failed. Please try again.");
        }
      } catch (err: any) {
        console.log(JSON.stringify(err, null, 2));
        Alert.alert("Error", err.errors[0].longMessage);
      } finally {
        setIsSigningIn(false);
      }
    },
    [isLoaded, signIn, setActive]
  );
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.onboarding2} className="z-0 w-full h-[250px]" />
          <Text className="absolute text-3xl text-neutral-dark font-JakartaSemiBold bottom-5 left-5">
            Welcome 👏
          </Text>
        </View>
        <View className="p-5">
          <AppForm
            initialValues={{ email: "", password: "" }}
            onSubmit={handleSignIn}
            validationSchema={validationSchema}
          >
            <AppFormField
              label="Email"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Enter your email"
              keyboardType="email-address"
              name="email"
              icon={icons.email}
              textContentType="emailAddress"
            />

            <AppFormField
              label="Password"
              autoCapitalize="none"
              autoCorrect={false}
              icon={icons.lock}
              name="password"
              placeholder="Enter password"
              secureTextEntry={true}
              textContentType="password"
            />
            <SubmitButton title="Sign In" isLoading={isSigningIn} />
          </AppForm>

          <Link
            href="/sign-up"
            className="mt-10 text-lg text-center font-Jakarta text-general-200"
          >
            <Text>Don't have an account? </Text>
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
