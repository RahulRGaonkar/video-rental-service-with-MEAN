const mongoose = require('mongoose');
require('dotenv-flow').config();

module.exports = function() {
  mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
  ).then(
    () => console.log('Connected to DB')
  ).catch(
    () => console.error('Error while connecting to DB')
  );
}
