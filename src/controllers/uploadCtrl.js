'use strict'

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../views/public/upload/'),
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname} - ${Date.now()} ${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000000 }
}).single('img')

module.exports = upload