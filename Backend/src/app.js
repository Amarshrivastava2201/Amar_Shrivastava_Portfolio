const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const certificationRoutes = require('./routes/certificationRoutes');
const contactRoutes = require('./routes/contactRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api/projects', projectRoutes);

app.use('/api/certifications', certificationRoutes);

app.use('/api/contacts', contactRoutes);

app.use(errorHandler);


// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

module.exports = app;
