const express = require('express');

const router = express.Router();
const { User } = require('../models/user');

router.route('/signup').put(async (req, res) => {
  try {
    console.log(req.body);
    const signupData = req.body;
    const newUser = new User(signupData);
    newUser.password = newUser.generateHash(signupData.password);
    await newUser.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.route('/login').post(async (req, res) => {
  try {
    await User.findOne({ email: req.body.email }, (err, user) => {
      if (!user.validPassword(req.body.password)) {
        res.status(500).json({ error: err.message });
      } else {
        res.sendStatus(200);
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
