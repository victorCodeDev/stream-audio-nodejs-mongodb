const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// inicializacion
const app = express();

// middlewars
app.use(cors())
app.use(morgan('dev'))

// routes

app.listen(3000);
console.log('Server on port 3000');

