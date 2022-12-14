const router = require('express').Router()
const usersController = require('../controllers/user.controller')
const coursesController = require('../controllers/course.controller')
const authMiddleware = require('../middlewares/auth.middleware')
const passport = require('passport')
const authController = require('../controllers/auth.controller')
const blogController = require('../controllers/blog.controller')
const fileUploader = require('../config/cloudinary.config')


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
router.get('/users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.get('/users/:id', authMiddleware.isAuthenticated, usersController.detail)
router.patch('/users/:id', usersController.update)
router.delete('/users/:id', usersController.delete)


//COURSES
router.get('/courses', coursesController.list)
router.post('/courses', fileUploader.single("image"), coursesController.create)
router.get('/courses/:id', coursesController.detail)
router.patch('/courses/:id', fileUploader.single("image"), coursesController.update)
router.delete('/courses/:id', coursesController.delete)


//BLOG
router.get('/blogs', blogController.list )
router.get('/blogs/:id', blogController.detail)
router.get('/blogs/search/:keyword', blogController.search)
router.post('/blogs', authMiddleware.isAuthenticated, fileUploader.single("image"), blogController.create)
router.patch('/blogs/:id', fileUploader.single("image"),  blogController.update)
router.delete('/blogs/:id', blogController.delete)

module.exports = router