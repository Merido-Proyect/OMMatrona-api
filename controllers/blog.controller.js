const Blog = require('../models/Blog.model')
const createError = require('http-errors')

//CRUD

//read
module.exports.list = (req, res, next) => {
    Blog.find()
    .populate('prof')
    .then(blogPosts => {
        res.status(200).json(blogPosts)
    })
    .catch(next)
}

//detail
module.exports.detail = (req, res, next) => {
 Blog.findById(req.currentUser)
 .then(blog => {
    if (!blog) {
        next(createError(404, 'blog not found'))
    } else {
        res.json(blog)
    }
 })
}

//create
module.exports.create = (req, res, next) => {
    const data = {
        ...req.body,
        prof: req.currentUser
    }

    Blog.create(data)
    .then( blogPost => {
        res.status(201).json(blogPost)
    })
    .catch(next)
}

//update
module.exports.update = (req, res, next) => {
    const {id} = req.params

    Blog.findByIdAndUpdate(id, req.body, {new:true})
    .then(blog => res.status(201).json(blog))
    .catch(err => console.error(err))
}

//delete
module.exports.delete = (req, res, next) => {
    const {id} = req.params
    Blog.findByIdAndDelete(id)
    .then(() => {
        console.log('blog entry deleted');
        res.status(204)
    }).catch( err => console.error(err))
}