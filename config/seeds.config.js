require("dotenv").config()
const mongoose = require('mongoose');
const Blog = require('../models/Blog.model');
const BLOGS = require('../data/seeds/blogSeeds.json')

// DB connect

require('../config/db.config');


// Drop DB

mongoose.connection.once('open', () => {
  mongoose.connection.db.dropDatabase()
    .then(() => {
      console.info('Db dropped')

      return Blog.create(BLOGS)
    })
    .then(createdBlogs => {
        createdBlogs.forEach(Blog => console.log(`${Blog.title} was created`))

      //exit DB
      return mongoose.connection.close()
    })
    .then(() => {
      console.log('Connection closed')

      process.exit(1)
    })
    .catch(err => {
      console.error(err)
      process.exit(0)
    })
})