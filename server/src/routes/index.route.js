const express = require('express');
const GenreRouter = require('./genre.route');
const BookRouter = require('./book.route');
const UserRouter = require('./user.route');
const AuthRouter = require('./auth.route');
const router = express.Router();

const api = router
  .use('/genre', GenreRouter)
  .use('/book', BookRouter)
  .use('/user', UserRouter)
  .use('/auth', AuthRouter)

module.exports = router.use('/api', api)
