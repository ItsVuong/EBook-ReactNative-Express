const express = require('express');
const GenreRouter = require('./genre.route');
const BookRouter = require('./book.route');
const UserRouter = require('./user.route');
const router = express.Router();

const api = router
  .use('/genre', GenreRouter)
  .use('/book', BookRouter)
  .use('/user', UserRouter)

module.exports = router.use('/api', api)
