const path = require('path')
const fs = require('fs')
const uuidv4 = require('uuid/v4')
const sharp = require('sharp')

class Resize {
  constructor (folder) {
    this.folder = folder
  }
  save (buffer) {
    const image = sharp(buffer)
    let filename = ''
    let filepath = ''

    return new Promise((resolve, reject) => {
      image.metadata()
        .then(({ height, width, format }) => {
          let fitAction = sharp.fit.contain
          const ratioOrig = width / height

          if (width / height > ratioOrig && width < height) {
            // width = Math.floor(width / ratioOrig)
            fitAction = sharp.fit.cover
          } else {
            // height = Math.floor(height * ratioOrig)
          }

          return {
            format,
            width,
            height,
            fitAction
          }
        }).then(async (args) => {
          filename = this.filename(args.format)
          filepath = this.filepath(filename)

          if (args.format !== 'gif') {
            await sharp(buffer)
              .resize(args.width, args.height, {
                fit: args.fitAction,
                withoutEnlargement: false
              })
              .jpeg({ quality: 80, force: false })
              .toFile(filepath)
          }
        }).then(() => {
          setTimeout(() => {
            fs.unlink(buffer, () => {})
            return resolve(filename)
          }, 100)
        })
    })
  }

  static filename (format) {
    return `${uuidv4()}.${format}`
  }

  filepath (filename) {
    return path.resolve(`${this.folder}/${filename}`)
  }
}

module.exports = Resize
