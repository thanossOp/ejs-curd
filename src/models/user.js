const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const userschema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    phonenumber: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    confirmpassword: {
        type: String,
        require: true
    },
}, {
    versionKey: false
})

userschema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        console.log('OKK')
        user.password = await bcrypt.hash(user.password, 10);
        next()
    } else {
        next();
    }
})


const User = mongoose.model('User', userschema);

module.exports = User