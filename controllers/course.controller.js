const createError = require('http-errors');
const Course = require('../models/Course.model');


//CRUD
//READ
module.exports.list = (req, res, next) => {
    Course.find()
    
    .then( courses => {
        console.log('✔️................course created');
        res.status(200).json(courses)
    })
    .catch( err => next(err))
}

//DETAIL
module.exports.detail = (req, res, next) => {
    Course.findById(req.params.id)   
    .then(course => {
        if (!course) {
            next(createError(404, 'Course not found'))
        } else {
            res.json(course)
        }
    })
    .catch( err => next(err))
}

//CREATE
module.exports.create = (req, res, next) => {
    console.log('creat');
    if (req.file) {
        req.body.image = req.file.path
    }

    const data = {
        ...req.body,
        prof: req.currentUser
    }
    Course.create(data)
    .then( course => {
        console.log('.......................course created', data);
        res.status(201).json(course)
    })
    .catch( err => next(err))
}

//UPDATE
module.exports.update = (req, res, next) => {
    console.log(req.body, req.file)
    if (req.file) {
        req.body.image = req.file.path
    }
    const { id } = req.params

    Course.findByIdAndUpdate(id, req.body, {new: true})
    .then(course => {
        console.log('✔️.............. course updated!')
        res.status(201).json(course)
    })
    .catch( err => next(err))
}

//DELETE
module.exports.delete = (req, res, next) => {
    const { id } = req.params
    Course. findByIdAndDelete(id)
    .then(() => {
        console.log('👎..............course deleted');
        res.status(204).send('OK blog deleted')
    })
    .catch( err => next(err))
}

