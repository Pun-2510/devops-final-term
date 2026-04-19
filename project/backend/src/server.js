const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/games', require('./routes/games'));

app.get('/health', (req, res) => res.json({ status: 'ok' }));

mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/gamedb')
  .then(() => app.listen(5000, () => console.log('Server running on :5000')));