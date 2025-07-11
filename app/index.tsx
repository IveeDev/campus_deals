import { Redirect } from "expo-router";

export default function Index() {
  return (
    // <View className="bg-primary flex-1 items-center justify-center">
    //   <Text>Welcome Home</Text>
    // </View>
    // <Redirect href={"/(root)/(tabs)/home"}/>
    <Redirect href={"/(auth)/welcome"} />
  );
}
