const express = require('express');
const GenreRouter = require('./genre.route')
const router = express.Router();

const api = router
  .use('/genre', GenreRouter)

module.exports = router.use('/api', api)
