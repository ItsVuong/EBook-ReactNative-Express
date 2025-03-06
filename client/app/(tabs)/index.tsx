import { Image, StyleSheet, Platform, Text, TouchableOpacity, FlatList } from 'react-native';

import StoreBar from '@/components/StoreBar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { View, ScrollView } from 'react-native';


export default function HomeScreen() {
  const fakeItems = [
    { item: require('@/assets/images/covers/chtulhu.webp') },
    { item: require('@/assets/images/covers/dr-jekyll-and-mr-hyde.webp') },
    { item: require('@/assets/images/covers/frankeinstein.jpg') },
    { item: require('@/assets/images/covers/frankeinstein.jpg') },
    { item: require('@/assets/images/covers/frankeinstein.jpg') },
  ]

  const horizontalList = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={{
          paddingHorizontal: 20, flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 8
        }}>
          <Text>Trending</Text>
          <TouchableOpacity>
            <Text>see more</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList data={fakeItems}
            renderItem={renderBooks}
            horizontal />
        </View>
      </View>
    )
  }
  const renderBooks = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          marginLeft: index == 0 ? 20 : 0,
        }}
      >
        <Image
          source={item.item}
          resizeMode='cover'
          style={{
            width: 170,
            height: 250,
            borderRadius: 20
          }}
        />

      </TouchableOpacity>
    )
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <StoreBar />
          <ScrollView style={{ marginTop: 0 }}>
            <View>
              {horizontalList()}
            </View>
            <View style={styles.fake_post}>abc</View>
            <View style={styles.fake_post}>abc</View>
            <View style={styles.fake_post}>abc</View>
            <View style={styles.fake_post}>abc</View>
          </ScrollView>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    shadowColor: 'black',
    shadowOffset: { width: 10, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  fake_post: {
    backgroundColor: '#e4e6eb',
    height: 200,
    margin: 16,
    borderRadius: 16
  }
});
