import CategoryPickerItem from "@/components/CategoryPickerItem";
import { AppForm, AppFormField, SubmitButton } from "@/components/forms";
import AppFormImagePicker from "@/components/forms/AppFormImagePicker";
import AppFormPicker from "@/components/forms/AppFormPicker";
import Screen from "@/components/Screen";
import { categories } from "@/constants/data";
import useLocation from "@/hooks/useLocation";

import React, { useState } from "react";
import { ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).label("Price"),
  description: Yup.string().required().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().min(1, "Please select atleast 1 image"),
});

const Post = () => {
  const [isPosting, setIsPosting] = useState(false);
  const { location } = useLocation();
  return (
    <Screen className="p-3">
      <KeyboardAwareScrollView
        className="flex-1 bg-white"
        showsVerticalScrollIndicator={false}
        extraScrollHeight={100}
        enableOnAndroid={true} // Important for Android
        keyboardShouldPersistTaps="handled" //
      >
        <ScrollView
          className="flex-1 bg-white"
          contentContainerStyle={{ paddingBottom: 200 }} // Add extra padding
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <AppForm
            initialValues={{
              title: "",
              description: "",
              price: "",
              condition: "",
              category: null,
              images: [],
              hostel: "",
              university: "",
              location: { latitude: 0, longitude: 0 },
            }}
            onSubmit={(values) => console.log(location)}
            validationSchema={validationSchema}
          >
            <AppFormImagePicker name="images" />
            <AppFormField name="title" placeholder="Title*" />
            <AppFormField
              name="price"
              placeholder="# Price"
              keyboardType="numeric"
              width={120}
            />
            <AppFormPicker
              items={categories}
              name="category"
              numberOfColumns={3}
              PickerItemComponent={CategoryPickerItem}
              placeholder="Category"
              width={"50%"}
            />
            <AppFormField
              name="description"
              numberOfLines={3}
              multiline
              placeholder="Description"
            />
            <AppFormField
              name="university"
              multiline
              placeholder="University"
            />
            <AppFormField name="hostel" multiline placeholder="Hostel/Lodge" />
            <SubmitButton title="Sell" isLoading={isPosting} />
          </AppForm>
        </ScrollView>
      </KeyboardAwareScrollView>
    </Screen>
  );
};

export default Post;
