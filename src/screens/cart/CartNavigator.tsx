import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StackScreenProps } from '@react-navigation/stack';
import { RootNavigatorProps } from '../../App';
import { CompositeNavigationProps } from '../../types/navigation';
import { ScreenOptions } from '../../constants/screenOptions';
import CartOverview from './CartOverview';

type CartNavigationParamList = {
  Cart: undefined;
};

type CartStackNavigatorProps = StackScreenProps<
  CartNavigationParamList,
  keyof CartNavigationParamList
>;

export type CartNavigatorParams = CompositeNavigationProps<
  RootNavigatorProps,
  CartStackNavigatorProps
>;

const Stack = createNativeStackNavigator<CartNavigationParamList>();

export default function CartNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...ScreenOptions.largeHeader,
      }}>
      <Stack.Screen name="Cart" component={CartOverview} />
    </Stack.Navigator>
  );
}
