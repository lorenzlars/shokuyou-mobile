import {Dimensions, Modal, StyleSheet, View} from 'react-native'
import React, {ReactNode, useEffect,} from 'react'
import Animated, {
  clamp, useAnimatedKeyboard,
  useAnimatedStyle,
  useSharedValue, withTiming,
  runOnJS
} from 'react-native-reanimated'
import GrabLine from "./GrabLine";
import {Gesture, GestureDetector} from "react-native-gesture-handler";


type Props = {
  visible?: boolean;
  onClose?: () => void;
  children?: ReactNode;
}

const {height} = Dimensions.get('screen');

export default function BottomModal({visible, onClose, children}: Props) {
  const keyboard = useAnimatedKeyboard();
  const currentHeight = useSharedValue(height);

  const pan = Gesture.Pan()
      .onUpdate((event) => {
        currentHeight.value = clamp(event.absoluteY, 150, height)
      })
      .onEnd(() => {
        if (currentHeight.value > height - 100) {
          currentHeight.value = withTiming(height)
          if (onClose) {
            runOnJS(onClose)()
          }
        }
      })

  const animatedStyles = useAnimatedStyle(() => ({
    top: clamp(currentHeight.value - keyboard.height.value, 150, height),
  }));

  useEffect(() => {
    currentHeight.value = withTiming(height - 150)
  }, [visible])

  // useEffect(() => {
  //   if (currentHeight.value > height - 100 && onClose) {
  //     onClose()
  //   }
  // }, [])

  return (
      <Modal
          animationType="slide"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}
      >
        <GestureDetector gesture={pan}>
          <Animated.View style={[styles.container, animatedStyles]}>
            <GrabLine/>
            {children}
          </Animated.View>
        </GestureDetector>
      </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9999999999999,
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
});
