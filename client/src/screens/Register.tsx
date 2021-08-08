import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAtom } from 'jotai';
import { AuthNavProps } from '../types';
import { updateUser } from '../states';

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

export const Register = ({ navigation }: AuthNavProps<'Register'>) => {
  const [user, setUser] = useAtom(updateUser);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: '#333' }]}>Username</Text>
      <TextInput
        style={[styles.input, { marginVertical: 10 }]}
        placeholder="Username"
        onChangeText={e => setUser({ key: 'username', value: e })}
        value={user.username}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (user.username !== '') return navigation.navigate('RegisterBirthDay');
          return '';
        }}
      >
        <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};
