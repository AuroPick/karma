import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { login } from '../api';
import { loginApp, updateLoginUser } from '../states/login';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#fefefe',
    width: 300,
    borderRadius: 10,
    padding: 10,
  },
  button: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#7200A5',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export const Login: React.FC = () => {
  const [user, setUser] = useState<{ username: string; password: string }>({ username: '', password: '' });
  const [, setLoginedUser] = useAtom(updateLoginUser);

  const submitHandler = async () => {
    try {
      const { data } = await login(user);

      AsyncStorage.setItem('userInf', JSON.stringify({ username: user.username, password: user.password }));

      if (data.isAuthenticated) {
        setLoginedUser(data.user);
        loginApp(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={e => setUser(prevState => ({ ...prevState, username: e }))}
        value={user.username}
      />
      <TextInput
        style={[styles.input, { marginTop: 10 }]}
        placeholder="Password"
        onChangeText={e => setUser(prevState => ({ ...prevState, password: e }))}
        value={user.password}
        secureTextEntry
      />
      <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={submitHandler}>
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};
