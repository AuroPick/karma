import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthNavProps } from '../types';

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
});

export const Initial = ({ navigation }: AuthNavProps<'Initial'>) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.text}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
