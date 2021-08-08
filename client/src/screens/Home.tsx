import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { loginUser, logout, updateLoginUser, usersState, IUser } from '../states';
import { getUsers } from '../api';
import { User } from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export const Home: React.FC = () => {
  const [, setLoginedUser] = useAtom(updateLoginUser);
  const [user] = useAtom(loginUser);
  const [users, setUsers] = useAtom(usersState);

  useEffect(() => {
    getUsers(user.id).then(fetchedUsers => {
      if (!fetchedUsers.data.hasError) {
        setUsers(fetchedUsers.data.users);
      }
    });
  }, [user.id, setUsers]);

  return (
    <View style={[styles.container, { width: '100%' }]}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          logout();
          setLoginedUser({
            id: '',
            username: '',
            birthDay: { day: '', month: '', year: '' },
            image: '',
            likes: [{ _id: '', username: '', birthDay: { day: '', month: '', year: '' }, image: '' }],
            liked: [{ _id: '' }],
          });
        }}
      >
        <Text style={styles.text}>Logout</Text>
      </TouchableOpacity>
      {users.length > 0 && users[0]._id !== '' ? (
        <FlatList<IUser>
          data={users}
          renderItem={({ item }) => (
            <User id={item._id} birthDay={item.birthDay} image={item.image} username={item.username} />
          )}
          keyExtractor={item => item._id}
        />
      ) : null}
    </View>
  );
};
