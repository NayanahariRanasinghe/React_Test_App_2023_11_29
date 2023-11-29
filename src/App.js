// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Router, Switch, Route, withRouter } from "react-router-dom";
import Login from './components/login/Login';
import ShowDetails from './components/showDetails/ShowDetails';
import AddDetailsForm from './components/forms/AddDetailsForm';

import { createBrowserHistory } from 'history';
const history = createBrowserHistory();

class App extends React.Component {

  // constructor(props){
  //   super(props);
  // }

  render(){
    return (<Router history={history}>
      <Switch>
        {/* <Route path="/ShowDetails"><ShowDetails /></Route> */}
        <Route exact path="/" ><AddDetailsForm isNewForm={true} userDetailsList={null}/></Route>
        {/* <Route exact path="/" ><Login /></Route> */}
      </Switch></Router>
    );
  }
}

export default withRouter(App);
