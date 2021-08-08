import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { useAtom } from 'jotai';
import { updateUser } from '../states';

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

export const RegisterImage = ({ navigation }: AuthNavProps<'RegisterImage'>) => {
  const [user, setUser] = useAtom(updateUser);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: '#333' }]}>Image</Text>
      <Image style={{ height: 100, width: 100 }} source={{ uri: user.image.uri ? user.image.uri : ' ' }} />
      <TouchableOpacity
        style={[styles.button, { marginVertical: 10 }]}
        onPress={() =>
          ImagePicker.openPicker({ width: 300, height: 300, cropping: true, mediaType: 'photo' }).then(res =>
            setUser({ key: 'image', value: { uri: res.path, type: res.mime, name: res.path } })
          )
        }
      >
        <Text style={styles.text}>Choose</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (user.image.uri !== '') return navigation.navigate('RegisterPassword');
          return '';
        }}
      >
        <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};
