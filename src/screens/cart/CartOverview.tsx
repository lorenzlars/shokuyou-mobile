import { SafeAreaView, StyleSheet, View, Pressable } from 'react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import { compose, useDatabase, withDatabase, withObservables } from '@nozbe/watermelondb/react';
import { Database } from '@nozbe/watermelondb';
import { CartNavigatorParams } from './CartNavigator';
import Product from '../../model/Product';
import BottomModal from '../../components/BottomModal';
import ProductForm from './ProductForm';
import ProductLineItem from './ProductLineItem';
import SwipeableListItem from '../../components/SwipeableListItem';

type Props = {
  products: Product[];
  productCount: number;
};

function CartOverview({ products, productCount }: Props) {
  const database = useDatabase();
  const navigation = useNavigation<CartNavigatorParams>();
  const [visible, setVisible] = useState(false);

  const [search, setSearch] = useState('');
  const filteredRecipes = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
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
    });
  }, [navigation, productCount]);

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarBadge: productCount,
    });
  }, [productCount, navigation]);

  async function handleCreate() {
    setVisible(true);
  }

  async function handleDelete(product: Product) {
    await database.write(async () => {
      await product.destroyPermanently();
    });
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {filteredRecipes.length > 0 && (
          <FlashList
            data={filteredRecipes}
            renderItem={({ item }) => (
              <SwipeableListItem onDelete={async () => await handleDelete(item)}>
                <ProductLineItem product={item} />
              </SwipeableListItem>
            )}
            estimatedItemSize={productCount}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: '#d1d1d1',
                  marginLeft: 20,
                  marginRight: 20,
                }}
              />
            )}
          />
        )}
      </SafeAreaView>
      <BottomModal visible={visible} onClose={() => setVisible(false)}>
        <ProductForm />
      </BottomModal>
      <Pressable onPress={handleCreate}>
        <View style={styles.floatingButton} />
      </Pressable>
    </>
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
  },
});

const enhance = compose(
  withDatabase,
  withObservables<{ database: Database }, any>([], ({ database }) => ({
    products: database.collections
      .get<Product>('products')
      .query()
      .observeWithColumns(['_id', 'quantity']),
    productCount: database.collections.get<Product>('products').query().observeCount(),
  })) as any,
);

export default enhance(CartOverview);
