import {StyleSheet} from "react-native";
// https://reactnavigation.org/docs/stack-navigator#installation
import 'react-native-gesture-handler';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {StackScreenProps} from "@react-navigation/stack";
import {RootNavigatorProps,} from "../../App";
import {CompositeNavigationProps} from "../../types/navigation";
import SettingsOverview from "./SettingsOverview";
import {ScreenOptions} from "../../constants/screenOptions";

type SettingsNavigationParamList = {
  SettingsOverview: undefined;
};

type SettingsStackNavigatorProps = StackScreenProps<SettingsNavigationParamList, keyof SettingsNavigationParamList>

export type SettingsNavigatorParams = CompositeNavigationProps<RootNavigatorProps, SettingsStackNavigatorProps>

const Stack = createNativeStackNavigator<SettingsNavigationParamList>();

export default function SettingsNavigator() {
  return (
      <Stack.Navigator screenOptions={ScreenOptions.largeHeader}>
        <Stack.Screen name="SettingsOverview" component={SettingsOverview}
                      options={{title: 'Settings'}}/>
      </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
