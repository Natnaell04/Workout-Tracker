const express = require("express")
const app = express();
const mysql = require("mysql2");
const workoutRoutes = require('./routes/workoutRoutes');
const cors = require('cors');


app.use(cors());


app.use(express.json());


app.use('/api/workouts', workoutRoutes);


const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'nati',  
  password: 'nati04',  
  database: 'workout'  
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

app.get("/install", (req, res) => {
  let message = "Tables Created";
  let createworkout = `CREATE TABLE if not exists workout(
id INT AUTO_INCREMENT PRIMARY KEY,
date DATE
name VARCHAR(255),
sets INT,
reps INT
 
)`;

connection.query(createworkout, (err, results, fields) =>{
  if (err) console.log(err);
  });

  res.end(message);

});

app.post("/addWorkout", (req, res) => {
  console.log(req.body);
  
  const {name, date, sets, reps} = req.body;

  let sqlAddToWorkout = "INSERT INTO workout (name, date, sets, reps) VALUES (?, ?, ?, ?)";

  connection.query(sqlAddToWorkout, [name, date, sets, reps], (err, result) => {
     if (err) {
        console.log(err);
        res.status(500).send("Error inserting workout");
        return;
}
     
        console.log("1 Workout inserted");
     res.end("Workout added successfully");
  });
;

})

app.put('/updateWorkout', (req, res) => {
  const { id, name, sets, reps, date } = req.body;

  const sqlUpdate = `
    UPDATE workout
    SET name = ?, sets = ?, reps = ?, date = ?
    WHERE id = ?
  `;
  
  connection.execute(
    sqlUpdate,
    [name, sets, reps, date, id], 
    (err, results) => {
      if (err) {
        console.error('Error updating workout:', err);
        return res.status(500).send('Internal Server Error');
      }

      if (results.affectedRows === 0) {
        return res.status(404).send('Workout not found');
      }

      res.status(200).send('Workout updated successfully');
    }
  );
});

app.delete('/deleteWorkout/:id', (req, res) => {
  const { id } = req.params;

  const deleted = 'DELETE FROM workouts WHERE id = ?';
  
  connection.execute(deleted, [id], (err, results) => {
    if (err) {
      console.error('Error deleting workout:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (results.affectedRows === 0) {
      return res.status(404).send('Workout not found');
    }

    res.status(200).send('Workout deleted successfully');
  });
});
