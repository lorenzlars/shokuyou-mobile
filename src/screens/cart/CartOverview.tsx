import {SafeAreaView, StyleSheet, View, Text, Pressable} from 'react-native';
import {useEffect, useLayoutEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {FlashList} from "@shopify/flash-list";
import {compose, withDatabase, withObservables} from "@nozbe/watermelondb/react";
import {Database} from "@nozbe/watermelondb";
import {CartNavigatorParams} from "./CartNavigator";
import Product from "../../model/Product";
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import BottomModal from "../../components/BottomModal";
import ProductForm from "./ProductForm";
import ProductLineItem from "./ProductLineItem";
import Animated, {SharedValue, useAnimatedStyle} from "react-native-reanimated";

type Props = {
  products: Product[];
  productCount: number
}

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    console.log('showRightProgress:', prog.value);
    console.log('appliedTranslation:', drag.value);

    return {
      transform: [{translateX: drag.value + 50}],
    };
  });

  return (
      <Animated.View style={styleAnimation}>
        <Text>Text</Text>
      </Animated.View>
  );
}


function CartOverview({products, productCount}: Props) {
  const navigation = useNavigation<CartNavigatorParams>();
  const [visible, setVisible] = useState(false)

  const [search, setSearch] = useState('');
  const filteredRecipes = products.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        inputType: 'text',
        onChangeText: (event) => setSearch(event.nativeEvent.text),
      },
    });
    navigation.getParent()?.setOptions({
      tabBarBadge: productCount,
    })
  }, [])

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarBadge: productCount,
    })
  }, [productCount])

  async function handleCreate() {
    setVisible(true)
  }

  return (
      <SafeAreaView style={{flex: 1}}>
        {filteredRecipes.length > 0 && <FlashList
            data={filteredRecipes}
            renderItem={({item}) =>
                <ReanimatedSwipeable
                    friction={2}
                    enableTrackpadTwoFingerGesture
                    rightThreshold={40}
                    renderRightActions={RightAction}>
                  <ProductLineItem product={item} onPress={() => setVisible(true)}/>
                </ReanimatedSwipeable>
            }
            estimatedItemSize={productCount}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View
                style={{height: 1, backgroundColor: '#d1d1d1', marginLeft: 20, marginRight: 20}}/>}
        />}
        <BottomModal visible={visible} onClose={() => setVisible(false)}>
          <ProductForm/>
        </BottomModal>
        <Pressable onPress={handleCreate}>
          <View style={styles.floatingButton}/>
        </Pressable>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    elevation: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#000000',
    alignItems: 'center',
  }
});

const enhance = compose(
    withDatabase,
    withObservables<{ database: Database }, any>([], ({database}) => ({
      products: database.collections.get<Product>('products').query().observeWithColumns(["_id"]),
      productCount: database.collections.get<Product>('products').query().observeCount()
    })) as any,
)

export default enhance(CartOverview)
