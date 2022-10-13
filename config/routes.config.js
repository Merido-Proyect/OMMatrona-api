const router = require('express').Router()
const adminsController = require('../controllers/admin.controller')
const usersController = require('../controllers/user.controller')
const coursesController = require('../controllers/course.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', (req, res, next) => res.json({ ok: true }))

//USERS
router.get('/users', usersController. list)
router.post('/users', usersController.create)
router.get('/users/me', authMiddleware.isAuthenticated, usersController.detail)
router.post('/users', usersController.update)
router.post('/users', usersController.delete)


//ADMINS
router.get('/admins', adminsController.list)
router.post('/admins', adminsController.create)
router.get('/admins/me', authMiddleware.isAuthenticated, adminsController.detail)
router.post('/admins', adminsController.update)
router.post('/admins', adminsController.delete)

//COURSES
router.get('/courses', coursesController.list)
router.post('/courses', coursesController.create)
router.get('/courses/:id', coursesController.detail)
router.post('/courses', coursesController.update)
router.post('/courses', coursesController.delete)

module.exports = router