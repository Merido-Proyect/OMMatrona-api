const createError = require('http-errors');
const Course = require('../models/Course.model');


//CRUD
//READ
module.exports.list = (req, res, next) => {
    Course.find()
    .populate('admin')
    .then( courses => {
        console.log('✔️................course created');
        res.status(201).json(courses)
    })
    .catch(err => console.log(err))
}

//DETAIL
module.exports.detail = (req, res, next) => {
    Course.findById(req.currentCourse)   //currentCourse!!!
    .then(course => {
        if (!course) {
            next(createError(404, 'Course not found'))
        } else {
            res.json(course)
        }
    })
    .catch(err => console.log(err))
}

//CREATE
module.exports.create = (req, res, next) => {
    Course.create(req.body)
    .then( course => {
        console.log('.......................course created');
        res.status(201).json(course)
    })
    .catch(err => console.log(err))
}

//UPDATE
module.exports.update = (req, res, next) => {
    const { id } = req.params

    Course.findByIdAndUpdate(id, req.body, {new: true})
    .then(course => {
        console.log('✔️.............. course updated!')
        res.status(201).json(course)
    })
    .catch(err => console.log(err))
}

//DELETE
module.exports.delete = (req, res, next) => {
    const { id } = req.params
    User. findByIdAndDelete(id)
    .then(() => {
        //NO SÉ QUE PONER AQUÍ, YA QUE NO NAVEGAMOS, NI REDIRECT DESDE AQUI... ***********************************************
    })
    .catch(err => console.log(err))
}

