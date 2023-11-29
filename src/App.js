// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from "react-router-dom";
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
        {/* <Route exact path="/" ><Login /></Route> */}
        <Route exact path="/"><ShowDetails /></Route>
        <Route path="/AddDetailsForm" ><AddDetailsForm isNewForm={true} userDetailsList={null}/></Route>
      </Switch>
    );
  }
}

export default withRouter(App);
