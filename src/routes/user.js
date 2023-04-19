const route = require('express').Router()

const { getAlluser, createUser, updateUser } = require('../controllers/registration')

const userschema = require('../authentication/uservalidation')

const datavalidation = require('../middleware/datavalidation')

const { login } = require('../controllers/loginuser')

route.get('/users', getAlluser)
route.post('/register', datavalidation(userschema), createUser)
route.put('/users/:id', updateUser)
route.post('/login', login)
module.exports = route