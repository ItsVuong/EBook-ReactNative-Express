const express = require('express');
const userModel = require('../models/user.model');
const UserRouter = express.Router()

UserRouter.post('/', async (req, res) => {
  try {
    const userData = req.body
    const newUser = new userModel(userData)
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})
UserRouter.get('/', async (req, res) => {
  try {
    let { pageSize, currentPage, genre, author } = req.query

    const query = {}
    if (genre) query.genre = genre;
    if (author) query.genre = author;

    const count = await userModel.countDocuments({ ...query });
    const divide = Number(count / pageSize);
    const pages = Math.ceil(divide);
    if (currentPage >= pages) { currentPage = pages }
    if (currentPage <= 0) { currentPage = 1 }

    const result = await userModel.find({ ...query }, null,
      { limit: pageSize, skip: (currentPage - 1) * pageSize })

    return res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({ error: 'Something when wrong' })
  }
})
UserRouter.get('/:id', async (req, res) => {
  try {
    const userId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(userId.trim())) {
      return res.status(401).send({ error: 'Invalid id form' })
    }
    const result = await userId.findById(userId)
      .populate('reading_list, cart, order_history');
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    res.status(500)
  }
})

module.exports = UserRouter;

