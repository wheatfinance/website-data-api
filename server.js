const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const config = require('./utils/environment');

//import { mailchimp } from './utils/environment';

const app = express();
// Connect to Database
connectDB();

// Use cors
app.use(cors());

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/audience', require('./routes/getUpdate'));
app.use('/api/contact', require('./routes/contact'));

const PORT = config.default.PORT || 5000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
