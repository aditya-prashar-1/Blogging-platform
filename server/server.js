import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';

// --- Initial Configuration ---


console.log(
  'SendGrid Key Check:',
  process.env.SENDGRID_API_KEY
    ? `Key starts with "${process.env.SENDGRID_API_KEY.substring(0, 5)}..."`
    : 'No, key is MISSING!'
);
connectDB();

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());

// --- API Routes ---
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); // Add post routes

// --- Test Route ---
app.get('/', (req, res) => {
  res.send('API is running...');
});

// --- Server Startup ---
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));