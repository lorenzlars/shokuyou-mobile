import {Pressable, StyleSheet, View, Text} from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {ComponentProps} from "react";

type Props = {
  icon?: ComponentProps<typeof MaterialCommunityIcons>['name'];
  label?: string
  theme?: 'default' | 'danger' | 'success';
  onPress?: () => void;
}

export default function NavigationButton(props: Props) {
  const theme = props.theme || 'default';
  const themes = {
    default: 'rgba(31,99,205,0.35)',
    danger: 'rgba(172,17,17,0.35)',
    success: 'rgba(25,163,25,0.35)',
  }

  return (
      <Pressable onPress={props.onPress}>
        <View
            style={[styles.container, props.icon ? {width: 32} : undefined, {backgroundColor: themes[theme]}]}>
          {props.icon && <MaterialCommunityIcons name={props.icon} size={22} style={styles.icon}/>}
          {props.label && <Text style={styles.label}>{props.label}</Text>}
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
    borderRadius: 1000,
  },
  icon: {
    opacity: 0.8,
    fontSize: 22,
  },
  label: {
    fontSize: 16,
    marginLeft: 8,
    marginRight: 8,
  }
});
