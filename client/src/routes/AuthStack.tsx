import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Initial, Login, Register, RegisterBirthDay, RegisterImage, RegisterPassword } from '../screens';
import { AuthStackParams } from '../types/AuthStackParams';

const Stack = createNativeStackNavigator<AuthStackParams>();

export const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Initial" component={Initial} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="RegisterBirthDay" component={RegisterBirthDay} />
      <Stack.Screen name="RegisterImage" component={RegisterImage} />
      <Stack.Screen name="RegisterPassword" component={RegisterPassword} />
    </Stack.Navigator>
  );
};
