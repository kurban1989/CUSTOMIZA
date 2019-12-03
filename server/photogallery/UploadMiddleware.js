const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination (req, file, cb) {
    // eslint-disable-next-line no-path-concat
    cb(null, path.resolve(__dirname + '/public'))
  },
  filename (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  limits: {
    fileSize: 20 * 1024 * 1024
  },
  fileFilter (req, file, cb) {
    sanitizeFile(file, cb)
  },
  storage
})

function sanitizeFile (file, cb) {
  // Define the allowed extension
  const fileExts = ['png', 'jpg', 'jpeg']
  // Check allowed extensions
  const isAllowedExt = fileExts.includes(file.originalname.split('.')[1].toLowerCase())
  // Mime type must be an image
  const isAllowedMimeType = file.mimetype.startsWith('image/')
  if (isAllowedExt && isAllowedMimeType) {
    return cb(null, true) // no errors
  } else {
    // pass error msg to callback, which can be displaye in frontend
    // eslint-disable-next-line standard/no-callback-literal
    cb('Error: File type not allowed!')
  }
}

module.exports = upload
