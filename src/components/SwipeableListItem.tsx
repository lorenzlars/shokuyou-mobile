import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import SwipeActionMenu from "./SwipeActionMenu";
import {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {ReactNode} from "react";
import {Alert, Dimensions, StyleSheet} from "react-native";

type Props = {
  children: ReactNode;
  onDelete?: () => void;
}

const {width} = Dimensions.get('screen');

export default function SwipeableListItem({children, onDelete}: Props) {
  const offset = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{
        translateX: withTiming(offset.value, {duration: 180}, () => {
          if ((offset.value >= width || offset.value <= -width) && onDelete) {
            runOnJS(onDelete)()
          }
        })
      }]
    }
  })

  function handleDelete() {
    Alert.alert('Delete', 'Are you sure you want to delete this item?', [{text: 'Cancel'}, {
      style: 'destructive',
      text: 'Delete', onPress: () => {
        offset.value = -width;
      }
    }])
  }

  return (
      <ReanimatedSwipeable
          containerStyle={style}
          friction={1}
          rightThreshold={0}
          renderRightActions={(progress, translation) => (
              <SwipeActionMenu
                  progress={progress}
                  translation={translation}
                  actions={[
                    {
                      label: 'Delete',
                      style: styles.deleteAction,
                      onPress: handleDelete
                    }
                  ]}
              />
          )}>
        {children}
      </ReanimatedSwipeable>
  )
}

const styles = StyleSheet.create({
  deleteAction: {
    height: '100%',
    width: '100%',
    padding: 10,
    backgroundColor: 'red',
    justifyContent: 'center',
  }
});
