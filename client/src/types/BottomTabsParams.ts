import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type BottomTabsParams = {
  Home: undefined;
  Likes: undefined;
};

export type BottomNavProps<T extends keyof BottomTabsParams> = {
  navigation: BottomTabNavigationProp<BottomTabsParams, T>;
  route: RouteProp<BottomTabsParams, T>;
};
