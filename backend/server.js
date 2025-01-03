const express = require('express');
const fs = require('fs').promises;
require('dotenv').config();
const routes = require('./routes');
const cors = require('cors')

const app = express();
app.use(cors());

const port = process.env.PORT || 8000;

app.use(express.static('public'));

app.use('/api/v1/', routes); 

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
