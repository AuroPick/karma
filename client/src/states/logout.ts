import AsyncStorage from '@react-native-async-storage/async-storage';

export const logout = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (error) {
    console.log(error);
  }
};
