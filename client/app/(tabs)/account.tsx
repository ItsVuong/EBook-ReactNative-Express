import ParallaxScrollView from "@/components/ParallaxScrollView";
import SearchBar from "@/components/StoreBar";
import { ThemedText } from "@/components/ThemedText";
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function searchBar() {
  return (
    <View style={{
      flex: 1, flexDirection: 'row', paddingHorizontal: 8,
      alignItems: 'center'
    }}>
      <TextInput style={{ borderWidth: 0.5, width: '100%', padding: 10, borderRadius: 20}}
        placeholder="Search"
      />
    </View>
  )
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 60 }}>
        {searchBar()}
      </View>
        <View style={styles.fake_post}>
          <ThemedText>abx xyz</ThemedText>
        </View>
        <View style={styles.fake_post}></View>
        <View style={styles.fake_post}></View>
        <View style={styles.fake_post}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100, height: 150, borderRadius: 10
  },
  fake_post: {
    backgroundColor: '#e4e6eb',
    height: 200,
    margin: 16,
    borderRadius: 16
  }
});
