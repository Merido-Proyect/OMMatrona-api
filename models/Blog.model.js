const mongoose = require("mongoose");


const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "A title is required"],
    },
    prof: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "A reference proffesional is required"],
    },
    image: {
      type: String,
    },
    keyWords: {
      type: [String], 
      required: [true, 'Keywords are required ']
    },
    post: {
      type: String,
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;

        return ret;
      },
    },
  }
);

const Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;
