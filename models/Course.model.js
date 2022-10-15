const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The name of the course is required"],
    },

    type: {
      type: String,
      enum: ["Activity", "Presencial-Course", "On-line-Course"],
      required: [true, "The type of course is required"],
    },
    schedule: {
      type: String,
      required: [true, 'A date for schedule is required']
    },
    hours: {
      type: String,
      required: [true, 'The hours of the activity is required']
    }
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
