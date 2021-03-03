const mongoose = require('mongoose');

const TelevisionSeries = mongoose.model('TeleSeries', new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 200
  },
  description: {
    type: String,
    required: false,
    maxlength: 1000
  },
  rated: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 2
  },
  yearOfRelease: {
    type: Number,
    required: true,
    min: 4,
    max: 4
  },
  genre: {
    type: String,
    required: true,
    maxlength: 200
  },
  seasons: {
    type: Number,
    required: true
  },
  numberInStock:{
    type: Number, 
    required: true,
    min: 0,
    max: 255
  },
  dailyRentalRate: {
    type: Number, 
    required: true,
    min: 0,
    max: 255
  }
}));

exports.TelevisionSeries = TelevisionSeries;

