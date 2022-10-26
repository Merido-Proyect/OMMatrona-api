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
     Blog.findById(req.params.id)
 .then(blog => {
      if (!blog) {
        next(createError(404, 'blog not found'))
    } else {
        res.status(201).json(blog)
    }
 }).catch(next)
}

//search by KeyWords
module.exports.search = (req, res, next) => {
    const { keyword } = req.params

    Blog.find({ keyWords: keyword.trim().toLowerCase() })
        .then((search) => {
            console.log(search)
            if (!search) {
                next(createError(404, 'palabra clave no encontrada, blog no disponible sobre eso'))
            } else{
            res.status(201).json(search)
            }
        })
        .catch(next)
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
    .catch( err => next(err))
}

//update
module.exports.update = (req, res, next) => {
    const {id} = req.params
    console.log('******* ', req.body)
    Blog.findByIdAndUpdate(id, req.body, {new:true})
        .then(blog => {
            console.log('******* ', blog);
            res.status(201).json(blog)
        })
        .catch( err => next(err))
    }
//delete
module.exports.delete = (req, res, next) => {
    const {id} = req.params
    Blog.findByIdAndDelete(id)
    .then(() => {
        res.status(204).send('OK blog deleted')
    }).catch( err => next(err))
}
