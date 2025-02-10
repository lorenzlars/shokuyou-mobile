import { StyleSheet, View } from 'react-native';

export default function GrabLine() {
  return <View style={styles.line} />;
}

const styles = StyleSheet.create({
  line: {
    width: 75,
    height: 6,
    backgroundColor: '#000000',
    opacity: 0.2,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
