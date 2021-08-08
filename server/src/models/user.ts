import { Schema, Document, model } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser {
  username: string;
  password: string;
  birthDay: { day: string; month: string; year: string };
  image: string;
  comparePassword: (password: string) => boolean;
}

export interface IUserSchema extends Document, IUser {
  likes: Omit<IUser[], 'password'>;
  liked: { _id: string }[];
}

const userSchema = new Schema<IUserSchema>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  birthDay: {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
  },
  image: {
    type: String,
    required: true,
  },
  likes: [
    {
      _id: {
        type: String,
      },
      username: {
        type: String,
      },
      birthDay: {
        day: { type: String },
        month: { type: String },
        year: { type: String },
      },
      image: {
        type: String,
      },
    },
  ],
  liked: [
    {
      _id: {
        type: String,
      },
    },
  ],
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  return bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    if (err) return next(err);
    this.password = hashedPassword;
    return next();
  });
});

userSchema.methods.comparePassword = function (password: string) {
  const isOk = bcrypt.compareSync(password, this.password);
  return isOk;
};

export const User = model<IUserSchema>('User', userSchema);
