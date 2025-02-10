import { Dimensions, Modal, StyleSheet, View } from 'react-native';
import React, { ReactNode } from 'react';
import Animated, {
  clamp,
  useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  withDelay,
} from 'react-native-reanimated';
import GrabLine from './GrabLine';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

type Props = {
  visible?: boolean;
  onClose?: () => void;
  children?: ReactNode;
  grabLeft?: ReactNode;
  grabRight?: ReactNode;
};

const { height } = Dimensions.get('screen');

const MAX_TOP_DISTANCE = height;
const COLLAPSE_TOP_DISTANCE = height - 350;
const MIN_TOP_DISTANCE = 64;

export default function BottomModal({ visible, onClose, children, grabLeft, grabRight }: Props) {
  const keyboard = useAnimatedKeyboard();
  const currentHeight = useSharedValue(MAX_TOP_DISTANCE);

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      currentHeight.value = clamp(event.absoluteY, MIN_TOP_DISTANCE, MAX_TOP_DISTANCE);
    })
    .onEnd(() => {
      if (currentHeight.value > COLLAPSE_TOP_DISTANCE) {
        currentHeight.value = withTiming(MAX_TOP_DISTANCE, undefined, () => {
          if (onClose) {
            runOnJS(onClose)();
          }
        });
      }
    });

  const animatedStyles = useAnimatedStyle(() => ({
    top: clamp(currentHeight.value - keyboard.height.value, MIN_TOP_DISTANCE, MAX_TOP_DISTANCE),
  }));

  function handleShowModal() {
    currentHeight.value = withDelay(1, withTiming(COLLAPSE_TOP_DISTANCE));
  }

  return (
    <Modal animationType="none" transparent={true} visible={visible} onShow={handleShowModal}>
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.container, animatedStyles]}>
          <View style={styles.grabContainer}>
            {grabLeft}
            <GrabLine />
            {grabRight}
          </View>
          {children}
        </Animated.View>
      </GestureDetector>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  grabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
