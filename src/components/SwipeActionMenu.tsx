import Animated, { SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Pressable, Text, View } from 'react-native';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

type Action = {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
};

type Props = {
  progress: SharedValue<number>;
  translation: SharedValue<number>;
  actions: Action[];
};

export default function SwipeActionMenu({ progress, translation, actions }: Props) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [{ translateX: translation.value + 50 }],
    };
  });

  return (
    <Animated.View style={[styleAnimation]}>
      {actions.map(({ onPress, label, style }, index) => (
        <Pressable onPress={onPress} key={index}>
          <View style={style}>
            <Text>{label}</Text>
          </View>
        </Pressable>
      ))}
    </Animated.View>
  );
}
