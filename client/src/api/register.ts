import axios from 'axios';
import { API_URI } from '../constants';

interface IServerData {
  isAuthenticated: boolean;
  user: {
    birthDay: {
      day: string;
      month: string;
      year: string;
    };
    id: string;
    username: string;
    image: string;
    likes: {
      _id: string;
      username: string;
      birthDay: { day: string; month: string; year: string };
      image: string;
    }[];
    liked: {
      _id: string;
    }[];
  };
  hasError: boolean;
  error?: {
    message: string;
  };
}

export const register = (data: FormData) =>
  axios.post<IServerData>(`${API_URI}/user/register`, data, { headers: { 'Content-Type': 'multipart/form-data' } });
