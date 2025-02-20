const multer = require('multer')
const {unlink} =  require('node:fs/promises')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype?.includes("image")) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error('Only image format (jpg, png...) allowed!')
      err.name = 'ExtensionError'
      err.status = 400
      return cb(err);
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' +file.originalname)
  }
})

const deleteImage = (path) => {
  try {
    unlink(path, (err) => {
      if(err) throw err;
      console.log(`${path} is deleted`)
    })
  } catch (err) {
    throw err
    console.log(err.message)
  }
}

const upload = multer({ storage: storage }).single('file')
module.exports = {upload, deleteImage}
