import express from 'express';
import dotenv from 'dotenv';
import adminRoutes from './routes/adminRoutes';
import userRoutes from './routes/userRoutes';
import connectDB from './config/dbConnection';

const app = express();
const port = 5001;
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// envs
export const MONGO_URI = process.env.MONGO_URI || '';
export const JWT_SECRET = process.env.JWT_SECRET || '';


connectDB();
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
})
