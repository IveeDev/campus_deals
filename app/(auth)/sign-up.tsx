import CustomButton from "@/components/CustomButton";
import { AppForm, AppFormField, SubmitButton } from "@/components/forms";
import InputField from "@/components/InputField";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { api } from "@/convex/_generated/api";
import { useSignUp } from "@clerk/clerk-expo";
import { useMutation } from "convex/react";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ReactNativeModal } from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Yup from "yup";

interface FormValues {
  fullName: string;
  email: string;
  password: string;
  university: string;
  hostel: string;
  phoneNumber: string;
  profileImageUrl?: string;
}

interface VerificationState {
  state: string;
  error: string;
  code: string;
  formValues?: FormValues;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full name is required").label("Full Name"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address")
    .label("Email"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .label("Password")
    .required("Password is required"),
  university: Yup.string()
    .required("University is required")
    .label("University"),
  hostel: Yup.string().required("Hostel is required").label("Hostel"),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .label("Phone Number"),
});

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const createUser = useMutation(api.users.createUser);
  const router = useRouter();

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verification, setVerification] = useState<VerificationState>({
    state: "default",
    error: "",
    code: "",
  });

  // Handle submission of sign-up form
  const handleSignUp = async (values: any) => {
    if (!isLoaded) return;
    setIsSigningUp(true);

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Store form values in verification state for use in verification phase
      setVerification({
        ...verification,
        state: "pending",
        formValues: values,
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    } finally {
      setIsSigningUp(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded || !verification.formValues) return;
    setIsVerifying(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        await createUser({
          fullName: verification.formValues.fullName,
          email: verification.formValues.email,
          profileImageUrl: verification.formValues.profileImageUrl || "",
          clerkId: signUpAttempt.createdUserId!,
          university: verification.formValues.university,
          hostel: verification.formValues.hostel,
          phoneNumber: verification.formValues.phoneNumber,
        });
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
        router.replace("/");
      } else {
        setVerification({
          ...verification,
          error: "Verification failed",
          state: "failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        error: err.errors[0].longMessage,
        state: "failed",
      });
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="flex-1 bg-white"
        contentContainerStyle={{ paddingBottom: 300 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex mx-8 mt-10">
          <TouchableOpacity onPress={() => router.replace("/(auth)/welcome")}>
            <Image source={icons.backArrow} className="w-8 h-8" />
          </TouchableOpacity>

          <View className="mt-5">
            <AppForm
              initialValues={{
                fullName: "",
                email: "",
                password: "",
                university: "",
                hostel: "",
                phoneNumber: "",
              }}
              onSubmit={handleSignUp}
              validationSchema={validationSchema}
            >
              <AppFormField
                label="Name"
                placeholder="Enter your name"
                name="fullName"
                icon={icons.person}
                textContentType="name"
              />

              <AppFormField
                label="Email"
                name="email"
                placeholder="Enter your email"
                icon={icons.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                textContentType="emailAddress"
                // value={values.email}
              />

              <AppFormField
                name="password"
                label="Password"
                placeholder="Enter password"
                icon={icons.lock}
                secureTextEntry={true}
                // value={values.password}
              />
              <AppFormField
                name="university"
                label="University"
                placeholder="Enter your university"
                icon={icons.university}
                // value={values.university}
              />
              <AppFormField
                label="Hostel"
                name="hostel"
                placeholder="Enter your hostel"
                icon={icons.hostel}
                // value={values.hostel}
              />

              <AppFormField
                label="Phone Number"
                name="phoneNumber"
                placeholder="Enter your phone number"
                icon={icons.phone}
                keyboardType="phone-pad"
              />

              <SubmitButton title="Sign Up" isLoading={isSigningUp} />
            </AppForm>

            <Link
              href="/sign-in"
              className="mt-10 text-lg text-center font-Jakarta text-general-200"
            >
              <Text>Already have an account? </Text>
              <Text className="text-primary-500">Log in</Text>
            </Link>
          </View>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="mb-2 text-2xl font-JakartaExtraBold">
              Verification
            </Text>
            <Text className="mb-5 font-Jakarta">
              We have sent a verification code to{" "}
              {verification.formValues?.email}. Please enter the code below to
              verify your email address.
            </Text>
            <InputField
              label="code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="mt-1 text-sm text-danger-500">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="Verify email"
              onPress={onVerifyPress}
              className="mt-5 bg-success-500"
              isLoading={isVerifying}
            />
          </View>
        </ReactNativeModal>

        {/* Verification Modal */}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]:">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl text-center font-JakartaBold">
              Verified!
            </Text>
            <Text className="mt-2 text-lg text-center text-gray-400 font-Jakarta">
              You have successfully verified your account
            </Text>
            <CustomButton
              onPress={() => {
                setShowSuccessModal(false);
                router.push("/(root)/(tabs)/home");
              }}
              title="Browse Home"
              className="mt-5"
              isLoading={isVerifying}
            />
          </View>
        </ReactNativeModal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
