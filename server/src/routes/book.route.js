const express = require('express');
const upload = require('../service/image.service');
const bookModel = require('../models/book.model');
const { default: mongoose, Error } = require('mongoose');
const imageModel = require('../models/image.model');
const BookRouter = express.Router();

BookRouter.post('/create', async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.sendStatus(500);
    }
    const { title, description, language, publish_date,
      isbn, price, on_sale, discount, genre, author
    } = req.body

    try {
      //Check the format of genres and create an array for inserting
      let genreObjectIdArray;
      if (genre) {
        genreObjectIdArray = genreIdCheck(genre)
      }
      //Check the format of authors and create an array for inserting
      let authorObjectIdArray;
      if (author) {
        authorObjectIdArray = authorIdCheck(author)
      }

      const { filename, mimetype } = req.file
      const newImage = new imageModel({
        name: filename,
        path: 'img/' + filename,
        mimetype
      })
      const savedImage = await newImage.save()

      const newBook = new bookModel({
        title, description, language, publish_date, isbn,
        price, on_sale, discount,
        genre: genreObjectIdArray,
        author: authorObjectIdArray,
        cover_image: savedImage._id
      })

      const savedBook = await newBook.save();
      res.send(savedBook);
    } catch (error) {
      console.log(error)
      res.send({ status: error.status || 500, message: error.message || 'Something when wrong' })
    }

  })
})
BookRouter.get('/', async (req, res) => {
  try {
    let { pageSize, currentPage, genre } = req.query

    const query = {}
    if (genre) query.genre = genre;

    const count = await bookModel.countDocuments({ ...query });
    const divide = Number(count / pageSize);
    const pages = Math.ceil(divide);
    if (currentPage >= pages) { currentPage = pages }
    if (currentPage <= 0) { currentPage = 1 }

    const result = await bookModel.find({ ...query }, null,
      { limit: pageSize, skip: (currentPage - 1) * pageSize })
      .populate('author reviews cover_image genre');

    return res.status(200).send(result)
  } catch (error) {
    console.log(error);
    res.status(500)
  }
})

//Check genre ids
function genreIdCheck(genre) {
  const checkedArray = []
  genre.forEach(element => {
    if (!mongoose.Types.ObjectId.isValid(element.trim())) {
      const error = new Error('Invalid genre ID format')
      error.status = 400
      throw error
    }
    checkedArray.push(element.trim())
  });
  return checkedArray
}
//Check Author ids
function authorIdCheck(author) {
  const checkedArray = []
  author.forEach(element => {
    if (!mongoose.Types.ObjectId.isValid(element.trim())) {
      const error = new Error('Invalid author ID format')
      error.status = 400
      throw error
    }
    checkedArray.push(element.trim())
  });
  return checkedArray
}

module.exports = BookRouter;
