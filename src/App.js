// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";
import Login from './components/login/Login';
import ShowDetails from './components/showDetails/ShowDetails';
import AddDetailsForm from './components/forms/AddDetailsForm';

class App extends React.Component {

  // constructor(props){
  //   super(props);
  // }

  render(){
    return (
      <Switch>
        <Route path="/ShowDetails" exact><ShowDetails /></Route>
        <Route path="/AddDetailsForm" exact><AddDetailsForm /></Route>
        <Route path="/" exact><Login /></Route>
      </Switch>
    );
  }
}

export default App;
