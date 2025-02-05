import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {JSX} from "react";

type Props = {
  title?: string;
  subtitle?: string;
  left?: JSX.Element;
  right?: JSX.Element;
}

export default function NavigationHeader(props: Props) {
  return (
      <ImageBackground style={styles.container} blurRadius={10}>
        <View style={styles.left}>
          {props.left}
        </View>
        <View style={styles.title}>
          <Text>{props.title}</Text>
          <Text>{props.subtitle}</Text>
        </View>
        <View style={styles.right}>
          {props.right}
        </View>
      </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 18,
    paddingTop: 64,
  },
  title: {
    alignItems: 'center',
  },
  left: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  },
  right: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0
  }
});
