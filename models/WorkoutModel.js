const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
      type: Date
    },

    exercises: [
      {  
      type: {
        type: String,
        trim: true
      },
    
      name: {
        type: String,
        trim: true,
        required: "A name for this type of exercise is required!"
      },

      duration: {
        type: String,
        trim: true,
        required: "How long does this exercise take?"
      },

      weight: {
        type: Number,
        trim: true
      },

      reps: {
        type: Number,
        trim: true
      },
    
      sets: {
        type: Number,
        trim: true
      },

      distance: {
        type: Number,
        trim: true
      }
    }
  ]
});

const WorkoutModel = mongoose.model("Workout", WorkoutSchema);
module.exports = WorkoutModel;