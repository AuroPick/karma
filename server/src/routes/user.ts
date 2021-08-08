import { Router } from 'express';
import { register, login, upload, getUsers, likeUser } from '../controllers';

export const userRouter = Router();

userRouter.post('/register', upload.single('image'), register);

userRouter.post('/login', login);

userRouter.post('/get', getUsers);

userRouter.post('/likeUser', likeUser);
