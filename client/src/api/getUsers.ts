import axios from 'axios';
import { API_URI } from '../constants';
import { User } from '../types';

interface IUser extends Omit<User, 'id'> {
  _id: string;
}

interface IServerData {
  users: IUser[];
  hasError: boolean;
  error?: {
    message: string;
  };
}

export const getUsers = (id: string) => axios.post<IServerData>(`${API_URI}/user/get`, { id });
