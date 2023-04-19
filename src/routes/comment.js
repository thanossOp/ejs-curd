const route = require('express').Router()

const { createComment } = require('../controllers/comment')

const isAuth = require('../middleware/isauth')

route.post('/comment',isAuth(),createComment)

module.exports = route