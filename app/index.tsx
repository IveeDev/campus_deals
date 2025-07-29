import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Index = () => {
  const { isSignedIn } = useAuth();

  // const [category, setCategory] = useState<PickerItemData | null>(
  // categories[0]
  // );

  // if (isSignedIn) {
  return <Redirect href="/(root)/(tabs)/home" />;
  // }
  // return <Redirect href="/(auth)/welcome" />;
};

export default Index;
