import React, { useState, useEffect } from 'react';

function Workout() {
  const [workoutName, setWorkoutName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [date, setDate] = useState('');
  const [editId, setEditID] = useState(-1);
  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem('workoutList');
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  useEffect(() => {
    localStorage.setItem('workoutList', JSON.stringify(workouts));
  }, [workouts]);

  const handleAddWorkout = async () => {
    if (workoutName && sets && reps && date) {
      const newWorkout = {
        id: Date.now(),
        name: workoutName,
        sets: parseInt(sets, 10),
        reps: parseInt(reps, 10),
        date: date,
      };

      await fetch('http://localhost:3001/addWorkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkout),
      });

      setWorkouts([...workouts, newWorkout]);

      setWorkoutName('');
      setSets('');
      setReps('');
      setDate('');
    }
  };

  const handleEdit = (id) => {
    const workoutToEdit = workouts.find((workout) => workout.id === id);
    setWorkoutName(workoutToEdit.name);
    setSets(workoutToEdit.sets);
    setReps(workoutToEdit.reps);
    setDate(workoutToEdit.date);
    setEditID(id);
  };

  const handleUpdate = async () => {
    if (workoutName && sets && reps && date) {
      const updatedWorkout = {
        id: editId,
        name: workoutName,
        sets: parseInt(sets, 10),
        reps: parseInt(reps, 10),
        date: date,
      };

      await fetch('http://localhost:3001/updateWorkout', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedWorkout),
      });

      setWorkouts(
        workouts.map((workout) =>
          workout.id === editId ? updatedWorkout : workout
        )
      );

      setWorkoutName('');
      setSets('');
      setReps('');
      setDate('');
      setEditID(-1);
    }
  };

   const handleDeleteWorkout = async (id) => {
    await fetch(`http://localhost:3001/deleteWorkout/${id}`, {
      method: 'DELETE',
    });

    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  return (
    <div className="container">
      <h1>Workout Tracker</h1>

      <div>
        <input
          type="text"
          placeholder="Workout Name"
          value={workoutName}
          onChange={(e) => setWorkoutName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Sets"
          value={sets}
          onChange={(e) => setSets(e.target.value)}
        />
        <input
          type="number"
          placeholder="Reps"
          value={reps}
          onChange={(e) => setReps(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        {editId === -1 ? (
          <button onClick={handleAddWorkout}>Add Workout</button>
        ) : (
          <button onClick={handleUpdate}>Update Workout</button>
        )}
      </div>

      {workouts.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Workout Name</th>
              <th>Sets</th>
              <th>Reps</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workouts.map((workout) =>
              workout.id === editId ? (
                <tr key={workout.id}>
                  <td>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={workoutName}
                      onChange={(e) => setWorkoutName(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={sets}
                      onChange={(e) => setSets(e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={reps}
                      onChange={(e) => setReps(e.target.value)}
                    />
                  </td>
                  <td>
                    <button onClick={handleUpdate}>Update</button>
                  </td>
                </tr>
              ) : (
                <tr key={workout.id}>
                  <td>{workout.date}</td>
                  <td>{workout.name}</td>
                  <td>{workout.sets}</td>
                  <td>{workout.reps}</td>
                  <td>
                    <button onClick={() => handleEdit(workout.id)}>Edit</button>
                    <button onClick={() => handleDeleteWorkout(workout.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Workout;
