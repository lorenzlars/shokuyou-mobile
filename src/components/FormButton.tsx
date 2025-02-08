import {Pressable, StyleSheet, View, Text} from 'react-native';

type Props = {
  label: string;
  theme?: 'default' | 'danger' | 'success';
  onPress?: () => void;
}

export default function FormButton(props: Props) {
  const theme = props.theme || 'default';
  const themes = {
    default: 'rgba(31,99,205,0.35)',
    danger: 'rgba(172,17,17,0.35)',
    success: 'rgba(25,163,25,0.35)',
  }

  return (
      <Pressable onPress={props.onPress}>
        <View style={[styles.container, {backgroundColor: themes[theme]}]}>
          <Text style={styles.label}>{props.label}</Text>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  label: {
    fontSize: 16,
  }
});
