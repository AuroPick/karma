import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAtom } from 'jotai';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { likeUser, login } from '../api';
import { API_URI } from '../constants';
import { loginUser, updateLoginUser } from '../states';
import { User as UserType } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  informations: {
    marginLeft: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  birthDay: {
    flexDirection: 'row',
  },
  margin: {
    marginLeft: 5,
  },
});

export const User: React.FC<Omit<UserType, 'likes' | 'liked'>> = ({
  id,
  birthDay,
  image,
  username,
}: Omit<UserType, 'likes' | 'liked'>) => {
  const [user] = useAtom(loginUser);
  const [, setLoginedUser] = useAtom(updateLoginUser);

  return (
    <View style={styles.container}>
      <Image style={{ height: 100, width: 100 }} source={{ uri: `${API_URI}/${image}` }} />
      <View style={styles.informations}>
        <Text>
          <Text style={styles.bold}>Username:</Text> {username}
        </Text>
        <View>
          <Text style={styles.bold}>Birthday</Text>
          <View style={styles.birthDay}>
            <Text>Day: {birthDay.day}</Text>
            <Text style={styles.margin}>Month: {birthDay.month}</Text>
            <Text style={styles.margin}>Year: {birthDay.year}</Text>
          </View>
        </View>
        {!user.liked.some(like => like._id === id) ? (
          <Text
            style={(styles.bold, { color: 'blue', marginTop: 10 })}
            onPress={async () => {
              await likeUser({
                likedUser: id,
                _id: user.id,
                username: user.username,
                birthDay: user.birthDay,
                image: user.image,
              });

              const userInf = await AsyncStorage.getItem('userInf');
              if (userInf) {
                const parsedUserInf = JSON.parse(userInf);
                const { data } = await login(parsedUserInf);
                setLoginedUser(data.user);
              }
            }}
          >
            Like
          </Text>
        ) : null}
      </View>
    </View>
  );
};
