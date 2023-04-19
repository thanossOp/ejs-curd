const joi = require('joi')

const uservalidation = joi.object({
    firstname: joi.string()
        .min(3)
        .max(10)
        .required(),
    lastname: joi.string()
        .min(3)
        .max(10)
        .required(),
    email: joi.string()
        .email({tlds : {allow : ['com','net']}})
        .pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)
        .required(),
    phonenumber: joi.string()
        .length(10)
        .required(),
    password: joi.string()
        .min(8)
        .pattern(/^[A-Z]+[a-z0-9].{8,}$/)
        .required(),
    confirmpassword: joi.string()
        .valid(joi.ref('password'))
        .required()
})

module.exports = uservalidation