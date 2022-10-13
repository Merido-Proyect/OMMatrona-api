const createError = require('http-errors')
const Admin = require("../models/Admin.model");

//CRUD

//READ
module.exports.list = (req, res, next) => {
  Admin.find()
    .then((admins) => {
        console.log('............................', admins);
      res.json(admins);
    })
    .catch(next);
};


//CREATE
module.exports.create = (req, res, next) => {
  Admin.create(req.body)
  .then(admin => {
    console.log('❤️..................... admin created!')
    res.status(201).json(admin)})
    .catch(err => console.log(err))
};

//DETAILS
module.exports.detail = (req, res, next) => {
    Admin.findById(req.currentAdmin)              //currentAdmin
    .then(admin => {
        if (!admin) {
            next(createError(404, 'Admin not found'))
        } else {
            res.json(admin)
        }
    })
    .catch(err => console.log(err))
}

//UPDATE
module.exports.update = (req, res, next) => {
    const { id } =req.params

    Admin.findByIdAndUpdate(id, req.body, {new: true})
    .then(admin => {
        console.log('👍......... Admin updated!')
        res.status(201).json(admin)
    })
    .catch(err => console.log(err))
}

//DELETE
module.exports.delete = (req, res, next) => {
    const { id } = req.params
    Admin. findByIdAndDelete(id)
    .then(() => {
        //NO SÉ QUE PONER AQUÍ, YA QUE NO NAVEGAMOS, NI REDIRECT DESDE AQUI... ***********************************************
    })
    .catch(err => console.log(err))
}
