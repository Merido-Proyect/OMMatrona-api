const router = require('express').Router()
const usersController = require('../controllers/user.controller')
const coursesController = require('../controllers/course.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const passport = require('passport')
const authController = require('../controllers/auth.controller')
const blogController = require('../controllers/blog.controller')

const SCOPES = ['profile', 'email']


router.get('/', (req, res, next) => res.json({ ok: true }))

//AUTH
router.post('/login', authController.login)
//passport auth with googleId
router.get('/login/google', passport.authenticate('google-auth', { scope: SCOPES}))
router.get('/auth/google/callback', authController.loginGoogle)



//USERS
router.get('/users', usersController. list)
router.post('/users', usersController.create)
router.get('/users/me', authMiddleware.isAuthenticated, usersController.detail)
router.patch('/users/:id', usersController.update)
router.delete('/users/:id', usersController.delete)


//COURSES
router.get('/courses', coursesController.list)
router.post('/courses', coursesController.create)
router.get('/courses/:id', coursesController.detail)
router.patch('/courses/:id', coursesController.update)
router.delete('/courses/:id', coursesController.delete)


//BLOG
router.get('/blogs', blogController.list )
router.get('/blogs/:id', blogController.detail)
router.post('/blogs', blogController.create)
router.patch('/blogs/:id', blogController.update)
router.delete('/blogs/:id', blogController.delete)

module.exports = router