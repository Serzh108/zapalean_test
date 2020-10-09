import React from 'react';
import { Switch } from 'react-router-dom';
import PieChart from './components/PieChart/PieChart';
import Form from './components/Form/Form';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Switch></Switch>
      <Form />
      <PieChart />
    </div>
  );
}

export default App;
