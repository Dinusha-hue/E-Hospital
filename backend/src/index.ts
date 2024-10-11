import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import requestRoutes from './routes/requestRoutes';
import { Server } from 'socket.io'; 

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/uploads', express.static('uploads'));

app.use(express.json());

connectDB();

app.use('/api/requests', requestRoutes);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
