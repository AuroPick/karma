import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
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

export const RegisterBirthDay = ({ navigation }: AuthNavProps<'RegisterBirthDay'>) => {
  const [user, setUser] = useAtom(updateUser);
  const [date, setDate] = useState(
    user.birthDay.day !== ''
      ? new Date(`${user.birthDay.year}/${user.birthDay.month}/${user.birthDay.day}`)
      : new Date()
  );
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: '#333' }]}>BirthDay</Text>
      <Text>{`${user.birthDay.day} ${user.birthDay.month} ${user.birthDay.year}`}</Text>
      <TouchableOpacity style={[styles.button, { marginVertical: 10 }]} onPress={() => setShowModal(true)}>
        <Text style={styles.text}>Choose</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (user.birthDay.day !== '') return navigation.navigate('RegisterImage');
          return '';
        }}
      >
        <Text style={styles.text}>Continue</Text>
      </TouchableOpacity>
      <Modal animationType="slide" visible={showModal} onRequestClose={() => setShowModal(false)}>
        <View style={styles.container}>
          <DatePicker
            date={date}
            onDateChange={newDate => {
              setUser({
                key: 'birthDay',
                value: {
                  day: newDate.getDate().toString(),
                  month: (newDate.getMonth() + 1).toString(),
                  year: newDate.getFullYear().toString(),
                },
              });
              setDate(newDate);
            }}
            mode="date"
          />
        </View>
      </Modal>
    </View>
  );
};
