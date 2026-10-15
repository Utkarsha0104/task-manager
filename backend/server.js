const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// CORS — allow Vercel frontend and localhost development
const allowedOrigins = [
  'https://task-manager-842u.vercel.app',
  'https://task-manager-mryjk5gjr-rit25.vercel.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const cors = require('cors');

app.use(cors({
  origin: [
    'https://task-manager-9xg3.vercel.app',
    'https://task-manager-9xg3-git-main-rit25.vercel.app',
    'https://task-manager-842u.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('MERN Task Manager API is running...');
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
