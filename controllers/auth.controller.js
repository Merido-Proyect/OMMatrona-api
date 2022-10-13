const jwt = require('jsonwebtoken')
const User = require('../models/User.model')
const Admin = require('../models/Admin.model')
require('dotenv')


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