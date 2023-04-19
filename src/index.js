const express = require('express')

const passport = require('passport')

const User = require('./models/user')

const app = express()

const jwtStrategy = require('passport-jwt').Strategy

const ExtractJwt = require('passport-jwt').ExtractJwt

const customroute = require('./routes/user')

const commentroute = require('./routes/comment')


const dotenv = require('dotenv').config()

require('./connection/db')

const newroute = require('./routes/newpage')

app.set('view engine', 'ejs')
app.use('/public', express.static('./src/imagegallery/'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', customroute)
app.use('/', newroute)
app.use('/', commentroute)




let option = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY
}

passport.use(new jwtStrategy(option, async (payload, done) => {
    try {
        const user = await User.findOne({
            email: payload.email
        })
        if (user) {
            return done(null, true)
        }
        else {
            return done(null, false)
        }

    } catch (error) {
        return done(null, false)
    }
}))


const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`${port}`)
})