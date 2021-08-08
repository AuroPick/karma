import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv-safe';

import { userRouter } from './routes';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter);
app.use('*', (req, res) => res.status(500).json({ hasError: true, error: { message: 'Invalid route' } }));

mongoose.connect(`${process.env.MONGODB_URI}`, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  io.on('connection', socket => {
    console.log('xd', socket);
  });
  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
  });
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
