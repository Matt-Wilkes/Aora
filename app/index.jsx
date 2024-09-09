import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View, Image } from "react-native";
import { Redirect, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import 'react-native-url-polyfill/auto'

export default function App() {
  return (
    // Ensures contact doesn't overlap based on device
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
      {/* w-full: Sets the width of the View to 100% of its parent container.
      min-h-[85vh]: min height of the View to 85% of the viewport height
      justify-center: Centers child components vertically within the View
      items-center: Centers child components horizontally within the View.
      px-4: Adds horizontal padding of 16 pixels  */}
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] w-full h-[300px]"
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Discover Endless Possibilities with{" "}
              <Text className="text-secondary-200">Aora</Text>
            </Text>
            <Image 
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8"
              resizeMode="contain"
            />
          </View>
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">Where creativity meets innovation: embark on a journey of limitless exploration with Aora</Text>

          <CustomButton 
          title="Continue with Email"
          // on press, navigate to sign-in
          handlePress={() => {router.push('/sign-in')}}
            containerStyles={"w-full mt-7"}
          ></CustomButton>
        </View>
      </ScrollView>
      {/* changing how the time, battery wifi etc are displayed */}
      <StatusBar backgroundColor="#161622" style='light'/> 
    </SafeAreaView>
  );
}
