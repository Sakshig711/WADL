const express = require('express');
const cors = require('cors');
const app = express();
const dbconfig = require('./dbconfig/dbconfig.js');
dbconfig;


app.use(cors());
app.use(express.json());

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});