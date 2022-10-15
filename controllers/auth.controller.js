const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const Admin = require('../models/Admin.model')
require('dotenv')
const passport = require('passport')
const mongoose = require('mongoose')


const createError = require('http-errors')

module.exports.login = (req, res, next) => {
    const { email, password } = req.body

    const LoginError = createError(401, 'Email or password are not valid, please try again')

    if(!email || !password) {
        next(LoginError)
    } else {
        User||Admin.findOne( { email })
        .then(user => {
            if (!user) {
                next(LoginError)
            } else {
                user.checkPassword(password)
                .then(result => {
                    if (!result) {
                        next(LoginError)
                    } else {
                        const token = jwt.sign(
                            {
                                id: user.id
                            },
                            
                            process.env.SECRET,

                            {
                                expiresIn: '1h'
                            }
                        )

                        res.json({ accessToken: token})
                    }
                })
            }
        })
    }
}

module.exports.loginGoogle = (req, res, next) => {
    passportlogin(req, res, next, 'google-auth')
}

module.exports.activateAccount = (req, res, next) => {
    const token = req.params.token

    User.findByIdAndUpdate(
        { activationToken: token, active: false},
        { active: true}
    )
    .then((user) => {
        if (user) {
            res.status(200).json({ message: "oye que si que hay usuario venga redirige"})
        } else {
            res.status(301) //????????????????
        }
        })
        .catch(next)
}