import React from 'react';
import { Image, Text, View } from 'react-native';
import { API_URI } from '../constants';

export const Like: React.FC<{ username: string; image: string }> = ({
  username,
  image,
}: {
  username: string;
  image: string;
}) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 5, marginVertical: 10 }}>
      <Image style={{ height: 50, width: 50 }} source={{ uri: `${API_URI}/${image}` }} />
      <Text style={{ marginLeft: 10 }}>
        <Text style={{ fontWeight: 'bold' }}>{username}</Text> liked you!
      </Text>
    </View>
  );
};
