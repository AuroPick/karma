import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { useAtom } from 'jotai';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateUser, loginApp, updateLoginUser } from '../states';
import { register } from '../api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    backgroundColor: '#fefefe',
    width: 300,
    borderRadius: 10,
    padding: 10,
  },
});

export const RegisterPassword: React.FC = () => {
  const [user, setUser] = useAtom(updateUser);
  const [, setLoginUser] = useAtom(updateLoginUser);
  const [isKVKKAccepted, setIsKVKKAccepted] = useState(false);

  const submitHandler = async () => {
    const formData = new FormData();

    formData.append('username', JSON.stringify(user.username));
    formData.append('password', JSON.stringify(user.password));
    formData.append('image', {
      uri: user.image.uri,
      type: user.image.type,
      name: user.image.name,
    });
    formData.append('birthDay', JSON.stringify(user.birthDay));

    try {
      const { data } = await register(formData);
      const userInf = {
        username: user.username,
        password: user.password,
      };

      AsyncStorage.setItem('userInf', JSON.stringify(userInf));

      if (data.isAuthenticated) {
        setLoginUser(data.user);
        loginApp(data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { marginTop: 10 }]}
        placeholder="Password"
        onChangeText={e => setUser({ key: 'password', value: e })}
        value={user.password}
        secureTextEntry
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
        <CheckBox disabled={false} value={isKVKKAccepted} onValueChange={newValue => setIsKVKKAccepted(newValue)} />
        <Text>KVKK Metnini Onaylıyorum!</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (user.password !== '' && isKVKKAccepted) submitHandler();
          return '';
        }}
      >
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
