import type {StackScreenProps,} from '@react-navigation/stack';
import {CompositeScreenProps} from "@react-navigation/native";

export type NavigationProps<T extends StackScreenProps> = T['navigation']
export type CompositeNavigationProps<A, B> = NavigationProps<CompositeScreenProps<A, B>>
export type RouteProps<T extends StackScreenProps> = T['route']
export type CompositeRouteProps<A, B> = RouteProps<CompositeScreenProps<A, B>>
