const router = require("express").Router()
const db = require("../models");
const mongoose = require("mongoose");

router.get("/all", (req, res) => {
    db.Workouts.find({}, (error, data) => {
      if (error) {
        res.send(error);
      } else {
        res.json(data);
      }
    });
  });
  
  router.get("/find/:id", (req, res) => {
    db.Exercises.findOne(
      {
        _id: mongoose.ObjectId(req.params.id)
      },
      (error, data) => {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(data);
          res.send(data);
        }
      }
    );
  });
  
  router.post("/update/:id", (req, res) => {
    db.Workouts.update(
      {
        _id: mongoose.ObjectId(req.params.id)
      },
      {
        $set: {
          title: req.body.title,
          note: req.body.note,
          modified: Date.now()
        }
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });
  
  router.delete("/delete/:id", (req, res) => {
    db.Workouts.remove(
      {
        _id: mongoose.ObjectID(req.params.id)
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });
  
  router.delete("/clearall", (req, res) => {
    db.Workouts.remove({}, (error, response) => {
      if (error) {
        res.send(error);
      } else {
        res.send(response);
      }
    });
  });

  
  router.get("/populated", (req, res) => {
    db.Workouts.find({})
      .populate("{me: one}, {")
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.get("/Workouts", (req, res) => {
    db.Workouts.find({})
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      });
  });
  
module.exports = router;