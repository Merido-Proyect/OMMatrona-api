const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name of the corse is required"],
    },

    type: {
      type: String,
      enum: ["Class", "Presencial", "On-line"],
      required: [true, "The type of course is required"],
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        delete ret.__v;
        delete ret.__id;
      },
    },
  }
);

const Course = mongoose.model( 'Course', CourseSchema);
module.exports = Course
