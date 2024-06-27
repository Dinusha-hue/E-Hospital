import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import requestRoutes from './routes/requestRoutes';

dotenv.config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

connectDB();

app.use('/api/requests', requestRoutes);

const PORT = process.env.PORT || 5000;
const uri = process.env.MONGO_URI

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
