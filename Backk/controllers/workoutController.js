const workouts = []; 

const getAllWorkouts = (req, res) => {
  res.json(workouts); 
};

const addWorkout = (req, res) => {
  const { date, name, sets, reps} = req.body; 

  if (!name || !sets || !reps || !date) {
    return res.status(400).json({ error: 'Please provide all fields' });
  }

  const newWorkout = {
    id: Date.now(),
    date, 
    name,
    sets,
    reps
    
  };

  workouts.push(newWorkout); 
  res.status(201).json(newWorkout); 
};


const deleteWorkout = (req, res) => {
  const { id } = req.params; 
  const workoutIndex = workouts.findIndex((workout) => workout.id == id); 

  if (workoutIndex === -1) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  const [deletedWorkout] = workouts.splice(workoutIndex, 1); 
  res.json(deletedWorkout); 
};

module.exports = {
  getAllWorkouts,
  addWorkout,
  deleteWorkout,
};
