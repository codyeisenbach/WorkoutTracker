const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
var path = require('path');

const PORT = process.env.PORT || 3000;

const db = require("./models");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { useNewUrlParser: true });


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

//html routes

app.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});


app.get('/exercise', function (req, res, next) {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
}); 


app.get('/stats', function (req, res, next) {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
});

// api routes

app.get("/api/workouts", (req, res) => {
  db.WorkoutModel.find({  })
    .then(dbFitness => {
      res.json(dbFitness);
    })
    .catch(err => {
      res.json(err);
    });
});


app.put("/api/workouts/:id", (req, res) => {
  console.log("body of the PUT to 'api/workouts'", req.body);
  console.log("Parameter of the PUT to 'api/workouts'", req.params.id);
  db.WorkoutModel.update({ _id:req.params.id },{ $push: { exercises: req.body }})
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
  })


app.post("/api/workouts", ({body}, res) => {
  console.log("body of request to api/workouts", body);
  db.WorkoutModel.create(body)
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
  })


app.get("/api/workouts/range", (req, res) => {

  db.WorkoutModel.find({})

    .then(dbFitness => {

      let range = dbFitness.slice(dbFitness.length-7);
      res.json(range);

    })
    .catch(err => {
      res.json(err);
    });
});