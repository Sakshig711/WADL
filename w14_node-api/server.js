const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const users = require('./users.json');
app.get('/api/users', (req, res) => res.json(users));
app.listen(3000, () => console.log('Server running on http://localhost:3000'));