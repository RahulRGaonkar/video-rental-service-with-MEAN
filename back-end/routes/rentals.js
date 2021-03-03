const {Rental} = require('../models/rental'); 
const {Movie} = require('../models/movie'); 
const {Customer} = require('../models/customer'); 
const { rentalValidation } = require('../validations/rental_validation');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

/* const mongoose = require('mongoose'); */
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const rentals = await Rental.find();
  res.send(rentals);
});

router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

router.post('/', [auth, admin], async (req, res) => {
  const { error } = rentalValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    },
    dateReturned: req.body.dateReturned,
    rentalFee: req.body.rentalFee
  });
  try {
    const savedRental = await rental.save();
  
    movie.numberInStock--;
    movie.save();
    
    res.send(savedRental);
  } catch(err) {
    res.status(400).send(err);
  }
});

router.put('/:id', [auth, admin], async(req, res) => {
  const { error } = rentalValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');
  console.log('customer\n' + JSON.stringify(customer));
  console.log('movie\n' + JSON.stringify(movie));
  try {
    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      {
        customer: {
          _id: customer._id,
          name: customer.name, 
          phone: customer.phone
        },
        movie: {
          _id: movie._id,
          title: movie.title,
          dailyRentalRate: movie.dailyRentalRate
        },
        dateReturned: req.body.dateReturned,
        rentalFee: req.body.rentalFee
      },
      {new: true});
      console.log('rental: ' + JSON.stringify(rental));
      res.send(rental);
  } catch(err) {
    res.status(400).send('The rental with the given ID was not found.');
  }
});

router.delete(':/id', [auth, admin], async(req, res) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);
  if (!rental) return res.status(404).send('The rental with the given ID was not found.');
  res.send(rental);
});

module.exports = router; 