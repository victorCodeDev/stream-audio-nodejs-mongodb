const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const tracksRoutes = require('./routes/tracks.routes');

// inicializacion
const app = express();

// middlewars
app.use(morgan('dev'))
app.use(cors())


// routes
app.use('/tracks', tracksRoutes);

app.listen(3000);
console.log('Server on port 3000');

