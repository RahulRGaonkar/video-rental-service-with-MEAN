const express = require('express');
const router = express();
const bcrypt = require('bcryptjs');

const { User } = require('../models/user');
const { registerUser, userlogin } = require('../validations/user_validation');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.post('/register', [auth, admin], async(req, res) => {
  const {error} = registerUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email id already exists');

  const salt = await bcrypt.genSalt(10);
  const hasedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hasedPassword
  });

  try {
    const savedUser = await user.save();
    res.send({user: savedUser._id, name: savedUser.name});
  } catch(err) {
    res.status(400).send(err);
  }
});

router.post('/login', async(req, res) => {
  const {error} = userlogin(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email invalid');

  const passwordValid = await bcrypt.compare(req.body.password, user.password);
  if (!passwordValid) return res.status(400).send('Password invalid');

  const token = user.generateAuthToken();
  const userObject = {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: token
  };
  res.header('auth-token', token).send(userObject);
});

router.get('/', async(req, res) => {
  const userArray = await User.find().sort('name');
  res.send(userArray);
});

module.exports = router;