import React from 'react';
import { useAtom } from 'jotai';
import { FlatList, Text, View } from 'react-native';
import { loginUser } from '../states';
import { Like } from '../components';

export const Likes: React.FC = () => {
  const [user] = useAtom(loginUser);

  return (
    <View>
      {user.likes.length > 0 && user.likes[0].username !== '' ? (
        <FlatList<{
          _id: string;
          username: string;
          birthDay: {
            day: string;
            month: string;
            year: string;
          };
          image: string;
        }>
          data={user.likes.slice().reverse()}
          renderItem={({ item }) => <Like image={item.image} username={item.username} />}
          keyExtractor={item => item._id}
        />
      ) : (
        <Text>Nobody Liked You</Text>
      )}
    </View>
  );
};
