import { atom } from 'jotai';
import { User } from '../types';

interface RegisterUser extends Omit<User, 'likes' | 'image' | 'id' | 'liked'> {
  password: string;
  image: { uri: string; type: string; name: string };
}

const user = atom<RegisterUser>({
  username: '',
  password: '',
  birthDay: { day: '', month: '', year: '' },
  image: { uri: '', type: '', name: '' },
});

export const updateUser = atom(
  get => get(user),
  (
    get,
    set,
    args: {
      key: string;
      value: string | { day: string; month: string; year: string } | { uri: string; type: string; name: string };
    }
  ) => set(user, { ...get(user), [args.key]: args.value })
);
