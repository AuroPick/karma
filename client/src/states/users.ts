import { atom } from 'jotai';
import { User } from '../types';

export interface IUser extends Omit<User, 'id'> {
  _id: string;
}

export const usersState = atom<IUser[]>([
  {
    _id: '',
    username: '',
    birthDay: { day: '', month: '', year: '' },
    image: '',
    likes: [{ username: '', birthDay: { day: '', month: '', year: '' }, image: '' }],
  },
]);
