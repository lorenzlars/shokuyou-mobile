import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

export type BaseSelectProps = {
  options: string[];
  value?: string;
  onValueChange?: (value: string) => void;
};

export default function BaseSelect({ options, value, onValueChange }: BaseSelectProps) {
  const [currentValue, setCurrentValue] = useState(value);

  function handleValueChange(value: string) {
    setCurrentValue(value);

    if (onValueChange) {
      onValueChange(value);
    }
  }

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <View>
      {options.map((option, index) => (
        <Pressable key={index} onPress={() => handleValueChange(option)}>
          <View style={styles.container}>
            <View style={[styles.selector, option === currentValue && styles.active]}></View>
            <Text>{option}</Text>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
    marginVertical: 2,
  },
  selector: {
    borderRadius: 9999,
    height: 20,
    width: 20,
    borderColor: '#000000',
    borderWidth: 2,
  },
  active: {
    backgroundColor: '#000000',
    padding: 4,
  },
});
