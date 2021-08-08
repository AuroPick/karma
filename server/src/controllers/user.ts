import { Request, Response } from 'express';
import { IUserSchema, User } from '../models';
import { checkUserExist } from './checkUserExist';

interface IReqBody extends Omit<IUserSchema, 'birthDay'> {
  birthDay: string;
}

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, birthDay }: IReqBody = req.body;
    const parsedBirthDay = JSON.parse(birthDay);
    const parsedUsername = JSON.parse(username);
    const parsedPassword = JSON.parse(password);

    const isExist = await checkUserExist(username);

    if (!isExist) {
      const user = new User({
        username: parsedUsername,
        password: parsedPassword,
        birthDay: parsedBirthDay,
        image: req.file?.path.replace(/\\/g, '/'),
      });

      const saved = await user.save();

      const { _id: id, image, likes, liked } = saved;

      return res.status(201).json({
        isAuthenticated: true,
        user: { id, username: parsedUsername, birthDay: parsedBirthDay, image, likes, liked },
        hasError: false,
      });
    }

    return res.status(200).json({ hasError: true, error: { message: 'This username is already in use' } });
  } catch (error) {
    return res.status(500).json({ hasError: true, error: { message: error.message } });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password }: IUserSchema = req.body;

    const user = await User.findOne({ username }).exec();

    if (user) {
      const isAuthenticated = user.comparePassword(password);

      if (isAuthenticated)
        return res.status(200).json({
          isAuthenticated: true,
          user: {
            birthDay: user.birthDay,
            id: user._id,
            username: user.username,
            image: user.image,
            likes: user.likes,
            liked: user.liked,
          },
          hasError: false,
        });

      return res.status(401).json({ isAuthenticated: false, hasError: true, error: { message: 'wrong password' } });
    }

    return res.status(401).json({ isAuthenticated: false, hasError: true, error: { message: 'user not found' } });
  } catch (error) {
    return res.status(500).json({ isAuthenticated: false, hasError: true, error: { message: error.message } });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const userList = await User.find({ _id: { $ne: req.body.id } }, '_id username birthDay image likes');
    res.status(200).json({ hasError: false, users: userList });
  } catch (error) {
    res.status(500).json({ hasError: true, error: { message: error.message } });
  }
};

export const likeUser = async (req: Request, res: Response) => {
  const { _id, username, birthDay, image, likedUser } = req.body;

  try {
    await User.findByIdAndUpdate(likedUser, { $push: { likes: { _id, username, birthDay, image } } });
    await User.findByIdAndUpdate(_id, { $push: { liked: { _id: likedUser } } });
    res.status(200).json({ hasError: false });
  } catch (error) {
    res.status(500).json({ hasError: true, error: { message: error.message } });
  }
};
