import axios from 'axios';
import { API_URI } from '../constants';
import { User } from '../types';

interface IData {
  username: string;
  password: string;
}

interface IServerData {
  isAuthenticated: boolean;
  user: User;
  hasError: boolean;
  error?: {
    message: string;
  };
}

export const login = (data: IData) => axios.post<IServerData>(`${API_URI}/user/login`, data);
