const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const userdetail = await User.findOne({email})
      
        const isMatch =await bcrypt.compare(password , userdetail.password)

        console.log(isMatch)
        if (isMatch) {

            const secret = process.env.SECRET_KEY
            const payload = {
                email: email,
                password: password

            }
            const token = jwt.sign(payload, secret, { expiresIn: 10000000 })

            res.json({
                status: 200,
                message: "Login succesful",
                token: token
            })
        } else {
            res.json({
                status: 401,
                Message: 'Invalid login details'
            })
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    login
}