import { User } from '../models';

export const checkUserExist = async (username: string) => {
  const isExist = await User.findOne({ username }).exec();

  if (isExist) return true;
  return false;
};
