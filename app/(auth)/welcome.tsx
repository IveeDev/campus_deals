import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants/data";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";

const Onboarding = () => {
  const swiperRef = React.useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  const handlePress = () => {
    if (isLastSlide) return router.replace("/(auth)/sign-up");
    else {
      swiperRef.current?.scrollTo(activeIndex + 1);
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <SafeAreaView className="flex items-center justify-between h-full">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="flex items-end justify-end w-full p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-primary rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-4">
            <Image
              source={item.image}
              className="w-full h-[400px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="mx-10 text-3xl text-center text-black font-JakartaBold">
                {item.title}
              </Text>
            </View>
            <Text className="text-[#4A4A4A] text-lg font-JakartaLight mx-10 mt-3 text-center">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get started" : "Next"}
        onPress={handlePress}
        className="w-[343px] h-[56px] mt-10 mb-5"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
