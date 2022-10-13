const jwt = require('jsonwebtoken')
const createError = require('http-errors')
require('dotenv')

module.exports.isAuthenticated = (req, res, next) => {
    const authorization = req.header('Authorization')

    if (authorization) {
        const [ type, token] = authorization.split(' ')

        if(type === 'Bearer') {
            if (token) {
                jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
                    if (err) {
                        next(err)
                    } else {
                        req.currentUser = decodedToken.id
                        next()
                    }
                })
            } else {
                next(createError(401, 'Token error'))
            }
        } else {
            next(createError(401, 'Bearer error'))
        }
    } else {
        next(createError(401, 'No auth'))
    }
}
