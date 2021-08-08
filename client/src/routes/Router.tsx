import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAtom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthStack } from './AuthStack';
import { loginUser, updateLoginUser } from '../states';
import { BottomTabs } from './BottomTabs';

export const Router: React.FC = () => {
  const [user] = useAtom(loginUser);
  const [, setLoginedUser] = useAtom(updateLoginUser);

  useEffect(() => {
    AsyncStorage.getItem('user').then(savedUser => {
      if (savedUser) {
        return setLoginedUser(JSON.parse(savedUser));
      }
      return console.log('not user');
    });
  }, [setLoginedUser]);
  return <NavigationContainer>{user.id !== '' ? <BottomTabs /> : <AuthStack />}</NavigationContainer>;
};
