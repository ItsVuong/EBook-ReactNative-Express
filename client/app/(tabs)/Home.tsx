import ParallaxScrollView from "@/components/ParallaxScrollView";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen(){
  return(
    <SafeAreaView style={{flex: 1}}>
      <View>Home Screen</View>
    </SafeAreaView>
  );
}
