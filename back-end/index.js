const express = require('express');
const app = express();
require('dotenv-flow').config();

require('./startup/db')();
require('./startup/routes')(app);

app.get('/', (req,res) => {
  res.send('Welcome to the matrix');
})

app.listen(3000, () => { console.log('listening to port 3000'); });