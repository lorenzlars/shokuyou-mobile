import {Pressable, StyleSheet, Text, View} from "react-native";
import Product from "../../model/Product";

type Props = {
  product: Product;
  onPress?: () => void;
}

export default function ProductLineItem({product, onPress}: Props) {
  return (
      <Pressable onPress={onPress}>
        <View style={styles.container}>
          {!!product.quantity && <Text>{product.quantity}</Text>}
          {!!product.unit && <Text>{product.unit}</Text>}
          <Text style={styles.name}>{product.name}</Text>
        </View>
      </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    height: 60,
    gap: 4,
  },
  name: {
    fontWeight: 600
  }
});
