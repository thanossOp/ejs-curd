const route = require('express').Router()

const path = require('path')

const isAuth = require('../middleware/isauth')

const multer = require('multer')

const { createpost, allpost, deletepost, allposts, updatepost } = require('../controllers/page')

const uploaod = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/imagegallery/')
        },
        filename: function (req, file, cb) {
            const name = Date.now() + '-' + Math.round(Math.random()) + path.extname(file.originalname)
            cb(null, file.fieldname + '-' + name)
        }
    })
})

route.get('/posts', allpost)
route.get('/postss', allposts)
route.post('/posts', isAuth(), uploaod.single('profile'), createpost)
route.put('/posts/:id', isAuth(), uploaod.single('profile'), updatepost)
route.delete('/postss/:id', deletepost)

module.exports = route