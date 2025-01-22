import {Image, StyleSheet, Platform, VirtualizedList, SafeAreaView, View} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {StatusBar} from "expo-status-bar";
import {ThemedText} from "@/components/ThemedText";

type ItemData = {
  id: string;
  title: string;
};

const getItem = (_data: unknown, index: number): ItemData => ({
  id: Math.random().toString(12).substring(0),
  title: `Item ${index + 1}`,
});

const getItemCount = (_data: unknown) => 50;

type ItemProps = {
  title: string;
};

const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
      <ThemedText>
        {title}
      </ThemedText>
    </View>
);

export default function HomeScreen() {
  return (
    <ThemedView style={styles.titleContainer}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container} >
          <VirtualizedList
              initialNumToRender={4}
              renderItem={({item}) => <Item title={item.title}/>}
              keyExtractor={item => item.id}
              getItemCount={getItemCount}
              getItem={getItem}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
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
  item: {
    backgroundColor: '#f9c2ff',
    height: 150,
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
});
