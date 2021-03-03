const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { TelevisionSeries } = require('../models/television-series');
const { createTelevisionSeries } = require('../validations/television-series_validation');

router.get('/', async(req, res) => {
  const teleSeriesArray = await TelevisionSeries.find().sort('name');
  res.send(teleSeriesArray);
});

router.get('/:id', async(req, res) => {
  const teleSeries = await TelevisionSeries.findById(req.params.id);
  if (!teleSeries) {
    return res.status(404).send('Teleseries with given ID was not found');
  }
  res.send(teleSeries);
});

router.post('/', [auth, admin], async(req,res) => {
  const { error } = createTelevisionSeries(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let teleseries = new TelevisionSeries({
    name: req.body.name,
    description: req.body.description,
    rated:  req.body.rated,
    yearOfRelease: req.body.yearOfRelease,
    genre: req.body.genre,
    seasons: req.body.seasons,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  });
  try {
    const savedTeleseries = await teleseries.save();
    res.send(savedTeleseries);
  } catch(err) {
    res.status(400).send(err);
  }
});

router.put('/:id', [auth, admin], async(req, res) => {
  const teleseriesUpdateObj = {};
  if (req.body.name) teleseriesUpdateObj['name'] = req.body.name;
  if (req.body.description) teleseriesUpdateObj['description'] = req.body.description;
  if (req.body.rated) teleseriesUpdateObj['rated'] = req.body.rated;
  if (req.body.yearOfRelease) teleseriesUpdateObj['yearOfRelease'] = req.body.yearOfRelease;
  if (req.body.genre) teleseriesUpdateObj['genre'] = req.body.genre;
  if (req.body.seasons) teleseriesUpdateObj['seasons'] = req.body.seasons;
  if (req.body.numberInStock) teleseriesUpdateObj['numberInStock'] = req.body.numberInStock;
  if (req.body.dailyRentalRate) teleseriesUpdateObj['dailyRentalRate'] = req.body.dailyRentalRate;

  const teleseries = await TelevisionSeries.findByIdAndUpdate(
    req.params.id,
    teleseriesUpdateObj,
    {new: true}
  );

  if (!teleseries) return res.status(404).send('Teleseries with the given ID was not found');
  res.send(teleseries);

});

router.delete('/:id', [auth, admin], async(req,res) => {
  const teleseries = await TelevisionSeries.findByIdAndRemove(req.params.id);
  if (!teleseries) return res.status(404).send('Teleseries with the given ID was not found');
  res.send(teleseries);
});

module.exports = router;