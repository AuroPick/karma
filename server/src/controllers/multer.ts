import { Request, Express } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { User } from '../models';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(new Error('please upload only image'));
  }

  const { username } = req.body;

  User.findOne({ username }).then(user => {
    if (user) {
      cb(new Error('this user already exist'));
    }
  });
};

export const upload = multer({ storage, fileFilter });
