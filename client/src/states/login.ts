import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';
import { User } from '../types';

export const loginUser = atom<User>({
  id: '',
  username: '',
  birthDay: { day: '', month: '', year: '' },
  image: '',
  likes: [{ _id: '', username: '', birthDay: { day: '', month: '', year: '' }, image: '' }],
  liked: [{ _id: '' }],
});

export const updateLikes = atom(
  get => get(loginUser),
  (
    get,
    set,
    args: { _id: string; username: string; birthDay: { day: string; month: string; year: string }; image: string }
  ) => set(loginUser, { ...get(loginUser), likes: [...get(loginUser).likes, args] })
);

export const updateLoginUser = atom(null, (get, set, args: User) => set(loginUser, args));

export const loginApp = async (data: User) => {
  const jsonData = JSON.stringify(data);
  try {
    await AsyncStorage.setItem('user', jsonData);
  } catch (error) {
    console.log(error);
  }
};
