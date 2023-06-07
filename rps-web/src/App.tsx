import React from 'react';
import logo from './logo.svg';
import './App.scss';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <div>RPS</div>
      <Home rpsRepo={{playGame: () => Promise.resolve('')}}/>
    </div>
  );
}

export default App;
