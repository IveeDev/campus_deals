import AppPicker from "@/components/AppPicker";
import { PickerItemData } from "@/types/type";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const categories: PickerItemData[] = [
  { label: "Electronics", value: 1 },
  { label: "Clothing", value: 2 },
  { label: "Books", value: 3 },
  { label: "Furniture", value: 4 },
  { label: "Sports", value: 5 },
  { label: "Toys", value: 6 },
  { label: "Beauty", value: 7 },
  { label: "Automotive", value: 8 },
];

const Index = () => {
  const { isSignedIn } = useAuth();
  const [category, setCategory] = useState<PickerItemData | null>(null);

  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }
  // return <Redirect href="/(auth)/welcome" />;
  return (
    <SafeAreaView className="flex-1 p-4 bg-white">
      <AppPicker
        selectedItem={category}
        onSelectItem={(item: PickerItemData) => setCategory(item)}
        items={categories}
        icon="dots-grid"
        placeholder="Category"
      />
    </SafeAreaView>
  );
  // return <AppPicker icon="app" placeholder="category" />;
};

export default Index;
