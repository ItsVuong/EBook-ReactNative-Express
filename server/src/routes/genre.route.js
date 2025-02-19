const express = require('express');
const genresModel = require('../models/genres.model');
const GenreRouter = express.Router();

GenreRouter.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newGenre = new genresModel({
      name: name,
      description: description,
    });

    const savedGenre = await newGenre.save();
    res.status(201).json(savedGenre)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
GenreRouter.get('/', async (req, res) => {
  try {
    const genres = await genresModel.find();
    res.status(201).json(genres);
  } catch (error) {
    console.log(error)
    res.status(500).send({error: 'Something when wrong'})
  }
})

module.exports = GenreRouter;
