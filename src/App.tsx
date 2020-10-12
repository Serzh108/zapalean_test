import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PieChart from './components/PieChart/PieChart';
import Form from './components/Form/Form';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Form} />
        <Route path="/piechart" exact component={PieChart} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
