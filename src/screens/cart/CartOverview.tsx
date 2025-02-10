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
import { ProductFormValues } from './useProductForm';
import NavigationButton from '../../components/NavigationButton';

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

  async function handleDelete(product: Product) {
    await database.write(async () => {
      await product.destroyPermanently();
    });
  }

  async function handleCheck(product: Product, value: boolean) {
    await database.write(async () => {
      await product.update((product) => {
        product.done = value;
      });
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async function handleCreate(values: ProductFormValues) {
    // TODO: Build wrapper which checks if product should be added or existing quantity increased

    await database.write(async () => {
      await database.get<Product>('products').create((recipe) => {
        recipe.name = values.name;
        recipe.unit = values.unit;
        recipe.quantity = values.quantity;
      });
    });
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        {filteredRecipes.length > 0 && (
          <FlashList
            contentInsetAdjustmentBehavior="automatic"
            data={filteredRecipes}
            renderItem={({ item }) => (
              <SwipeableListItem onDelete={async () => await handleDelete(item)}>
                <ProductLineItem product={item} onCheck={(value) => handleCheck(item, value)} />
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
      <BottomModal
        visible={visible}
        onClose={() => setVisible(false)}
        grabRight={<NavigationButton icon="check" />}>
        <ProductForm />
      </BottomModal>
      <Pressable onPress={() => setVisible(true)}>
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
      .observeWithColumns(['_id', 'quantity', 'name', 'done', 'unit']),
    productCount: database.collections.get<Product>('products').query().observeCount(),
  })) as any,
);

export default enhance(CartOverview);
