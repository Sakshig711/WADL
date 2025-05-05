/*const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const users = require('./users.json');
app.get('/api/users', (req, res) => res.json(users));
app.listen(5000, () => console.log('Server running on http://localhost:5000'));*/

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files from public/
app.use(express.static(path.join(__dirname, 'public')));

const users = require('./users.json');

app.get('/api/users', (req, res) => res.json(users));

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});

