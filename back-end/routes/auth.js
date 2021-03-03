const jwt = require('jsonwebtoken');
const config = require('config');
const _ = require('lodash');
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    let userValid = await User.findOne({ email: req.body.email });

    if (!userValid) return res.status(400).send('Invalid email or password');

   const validPwd = await bcrypt.compare(req.body.password,userValid.password);
   if (!validPwd) return res.status(400).send('Invalid email or password');

    const token =userValid.generateAuthToken();

   res.send(token);

});

function validate(req) {
    const schema = {
      email: Joi.string().min(5).max(250).required().email(),
      password: Joi.string().min(8).required(),
    };
  
    return Joi.validate(req, schema);
  }
module.exports = router; 