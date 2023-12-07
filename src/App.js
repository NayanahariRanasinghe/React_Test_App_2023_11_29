// import logo from './logo.svg';
import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Login from './components/login/Login';
import ShowDetails from './components/showDetails/ShowDetails';
import AddDetailsForm from './components/forms/AddDetailsForm';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route path="/AddDetailsForm" exact><AddDetailsForm /></Route>
        {this.props.loginReducer.signinDetails ?
          <Route path="/ShowDetails" exact><ShowDetails /></Route>
          :
          <>
            <Route path="/ShowDetails" exact><ShowDetails /></Route>
            <Route path="/" exact><Login /></Route>
          </>
        }
      </Switch>
    );
  }
}

// export default App;

const mapStateToProps = state => ({
  ...state
});

export default withRouter(connect(mapStateToProps)(App));
