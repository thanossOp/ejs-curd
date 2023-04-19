const User = require('../models/user')

const getAlluser = async (req, res) => {
    try {
        const getallusers = await User.find()
        res.json({
            data: getallusers
        })
    } catch (error) {
        res.json({
            status: 404,
            message: "Bad Request"
        })
    }
}

const createUser = async (req, res) => {
    try {
        const newuser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            phonenumber: req.body.phonenumber,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword,
        })

        const createduser = await newuser.save()
        res.json({
            status: 200,
            message: 'created new user',
            data: createduser
        })
    } catch (error) {
        res.json({
            status: 404,
            message: "Bad Request"
        })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.id
        const updateduser = await User.findOneAndUpdate({ _id: id }, req.body, {
            new: true
        })
        res.json({
            status: 200,
            message: "update successful",
            data: updateduser
        })
    } catch (error) {
        res.json({
            status: 404,
            message: "Bad Request"
        })
    }
}


module.exports = {
    getAlluser,
    createUser,
    updateUser
}