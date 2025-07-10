const express = require('express');
const router = express.Router();
const {
  getAllWorkouts,
  addWorkout,
  deleteWorkout,
} = require('../controllers/workoutController'); 

router.get('/', getAllWorkouts);

router.post('/', addWorkout);

router.delete('/:id', deleteWorkout);

module.exports = router;
