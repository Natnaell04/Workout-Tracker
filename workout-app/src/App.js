import React from 'react';
import Workout from './Components/Workout';
import './App.css'; 

function App() {
  return (
    <div className="App">
      
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#workout">Workout</a></li>
          <li><a href="#about">About</a></li>
        </ul>
      </nav>

      
      <section id="home">
        <h1>Welcome to the Workout Tracker</h1>
        <p>Track your workout progress and stay fit!</p>
      </section>

      
      <section id="workout">  
        <Workout />
      </section>

      
      <section id="about">
        <h2>About This App</h2>
        <p>This app helps you track your workouts, including the date, number of sets, and reps.</p>
      </section>
    </div>
  );
}

export default App;


