const express = require('express');
const GenreRouter = require('./genre.route');
const BookRouter = require('./book.route');
const router = express.Router();

const api = router
  .use('/genre', GenreRouter)
  .use('/book', BookRouter)

module.exports = router.use('/api', api)
