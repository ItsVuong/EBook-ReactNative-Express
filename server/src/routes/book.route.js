const express = require('express');
const { upload, deleteImage } = require('../service/image.service');
const bookModel = require('../models/book.model');
const { default: mongoose, Error } = require('mongoose');
const imageModel = require('../models/image.model');
const BookRouter = express.Router();

BookRouter.post('/create', async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      throw err
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

//Update
BookRouter.put('/:id/update', async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      throw err
    }
    try {
      const bookId = req.params.id;
      if (!mongoose.Types.ObjectId.isValid(bookId.trim())) {
        const error = new Error('Invalid genre ID format')
        error.status = 400
        throw error
      }

      const updateData = req.body

      if (req.file) {
        const { filename, mimetype } = req.file
        const newImage = new imageModel({
          name: filename,
          path: 'img/' + filename,
          mimetype
        })
        const savedImage = await newImage.save()
        updateData.cover_image = savedImage._id

        const oldData = await bookModel.findById(bookId).populate('cover_image');
        const oldImageId = oldData.cover_image._id
        if (oldImageId) {
          bookModel.findByIdAndDelete(oldData.cover_image._id)
          deleteImage('public/' + oldData.cover_image.name);
          imageModel.findByIdAndDelete()
        }
      }

      const updatedBook = await bookModel.findByIdAndUpdate(bookId, updateData)
      res.status(201).send(updatedBook)

    } catch (error) {
      console.log(error)
      if (req.file) {
        deleteImage('public/' + req.file.filename);
      }
      res.send({ status: error.status || 500, message: error.message || 'Something when wrong' })
    }
  })
})

//Get
BookRouter.get('/', async (req, res) => {
  try {
    let { pageSize, currentPage, genre, author } = req.query

    const query = {}
    if (genre) query.genre = genre;
    if (author) query.genre = author;

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
BookRouter.get('/:id', async (req, res) => {
  try {
    const bookId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(bookId.trim())) {
      return res.status(401).send({ error: 'Invalid id form' })
    }
    const result = await bookModel.findById(bookId)
      .populate('author reviews cover_image genre');
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    res.status(500)
  }
})

//Delete book
BookRouter.delete('/:id', async (req, res) => {
  try {
    const bookId = req.params.id
    if (!mongoose.Types.ObjectId.isValid(bookId.trim())) {
      return res.status(401).send({ error: 'Invalid id form' })
    }
    const deletedBook = await bookModel.findByIdAndDelete(bookId)
      .populate('cover_image')
    const coverImage = deletedBook?.cover_image
    if (coverImage) {
      imageModel.findByIdAndDelete(coverImage._id)
      deleteImage('public/' + coverImage.name)
    }
    res.json(deletedBook)
  } catch (error) {
    console.log(error)
    res.status(500).send('Something when wrong')
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
