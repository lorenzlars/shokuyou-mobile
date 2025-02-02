import {Pressable, StyleSheet, View} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";

type Props = {
  name: string;
  theme?: 'default' | 'danger' | 'success';
  onPress?: () => void;
}

export default function NavigationButton(props: Props) {
  const theme = props.theme || 'default';
  const themes = {
    default: '#000000',
    danger: 'red',
    success: 'green',
  }

  return (
      <Pressable onPress={props.onPress}>
        <View style={styles.container}>
          <MaterialCommunityIcons name={props.name} size={22} color={themes[theme]}/>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: 1000,
  },
});
