console.log('--- SERVER INITIALIZING ---');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const User = require('./models/User');
const Prediction = require('./models/Prediction');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/healthcare_mern';
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => {
    console.error('MongoDB connection error details:', err.message);
    // Don't exit, let the health check at least show the server is alive
  });

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('UNHANDLED REJECTION at:', promise, 'reason:', reason);
});

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user._id, name: user.name }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Prediction API
app.post('/api/predict/:disease', authenticateToken, async (req, res) => {
  try {
    const { disease } = req.params;
    const inputValues = req.body;
    
    // Call ML service
    const response = await axios.post(`${ML_SERVICE_URL}/predict/${disease}`, inputValues);
    const { prediction, confidence } = response.data;

    // Generate Recommendation
    let recommendation = '';
    if (disease === 'diabetes') {
      recommendation = prediction === 'Positive' || prediction === '1' 
        ? 'Maintain healthy diet, exercise regularly, and monitor blood glucose.' 
        : 'Keep up the good habits and regular checkups.';
    } else {
      recommendation = prediction === 'Positive' || prediction === '1'
        ? 'Reduce stress, maintain cardiovascular exercise, and monitor cholesterol.'
        : 'Good heart health maintained. Keep a balanced diet.';
    }

    // Save to Database
    const newPrediction = new Prediction({
      userId: req.user.id,
      diseaseType: disease,
      inputValues,
      prediction,
      confidence,
      recommendation // I should add this to model too
    });
    await newPrediction.save();

    res.json({ prediction, confidence, recommendation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get prediction' });
  }
});

app.get('/api/history', authenticateToken, async (req, res) => {
  try {
    const history = await Prediction.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve frontend built files
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
