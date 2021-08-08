import axios from 'axios';
import { API_URI } from '../constants';
import { User } from '../types';

interface IUser extends Omit<User, 'id' | 'likes' | 'liked'> {
  _id: string;
  likedUser: string;
}

interface IServerData {
  hasError: boolean;
  error?: {
    message: string;
  };
}

export const likeUser = (data: IUser) => axios.post<IServerData>(`${API_URI}/user/likeUser`, data);
