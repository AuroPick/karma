import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AuthStackParams = {
  Initial: undefined;
  Login: undefined;
  Register: undefined;
  RegisterBirthDay: undefined;
  RegisterImage: undefined;
  RegisterPassword: undefined;
};

export type AuthNavProps<T extends keyof AuthStackParams> = {
  navigation: NativeStackNavigationProp<AuthStackParams, T>;
  route: RouteProp<AuthStackParams, T>;
};
