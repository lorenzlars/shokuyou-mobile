import { Pressable, StyleSheet, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  checked?: boolean;
  onCheckedChange?: (value: boolean) => void;
};

export default function BaseCheckbox({ checked, onCheckedChange }: Props) {
  function handleCheckedChange(value: boolean) {
    if (onCheckedChange) {
      onCheckedChange(value);
    }
  }

  return (
    <Pressable onPress={() => handleCheckedChange(!checked)}>
      <View style={styles.container}>
        {checked && <MaterialCommunityIcons name="check" size={12} />}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    width: 24,
    height: 24,
  },
  active: {},
});
