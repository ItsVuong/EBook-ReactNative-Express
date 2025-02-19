const express = require('express');
const authorModel = require('../models/author.model');
const AuthorRouter = express.Router();

AuthorRouter.post('/', async (req, res) => {
  try {
    const { first_name, last_name, bio, birth_date, nationality } = req.body;
    const newAuthor = new authorModel({
      first_name: first_name,
      last_name: last_name,
      bio: bio,
      birth_date: birth_date || undefined,
      nationality: nationality || undefined
    });

    const savedAuthor = await newAuthor.save();
    res.status(201).json(savedAuthor)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
AuthorRouter.get('/', async (req, res) => {
  try {
    const authors = await authorModel.find()
    res.status(201).json(authors)
  } catch (err) {
    console.log(err)
    res.status(500).send({ error: "Something when wrong" })
  }
})

module.exports = AuthorRouter;
