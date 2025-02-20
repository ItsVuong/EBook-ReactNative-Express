const express = require('express');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const AuthRouter = express.Router()

AuthRouter.post('/', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username: username });
    if (!user) {
      return res.status(400).send("Username or password is wrong")
    }
    const validatePassword = await bcrypt.compare(password, user.password_hash)
    if (!validatePassword) {
      return res.status(400).send("Username or password is wrong")
    }
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
    const accessToken = jwt.sign(
      { username: username, email: user.email, id: user._id, admin: user.is_admin},
      accessTokenSecret
    );
    return res.status(200).send({ ...user.toJSON(), accessToken })

  } catch (error) {
    console.log(error)
    res.status(500).send("Something went wrong")
  }
})

module.exports = AuthRouter

