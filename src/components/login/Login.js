import React, { useState, useEffect } from 'react'
import { Row, Col, Button } from 'react-bootstrap';
import { withRouter, useHistory } from "react-router-dom";
import { useDispatch,connect } from "react-redux";
import { loginAction } from '../../redux/actions/login_action';
import { userDetailsListAction } from '../../redux/actions/user_details_action';

function Login(props) {
  const history = useHistory();
  const dispatch = useDispatch()
  const [username, setUserName] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  const [userLoginStatus, setUserLoginStatus] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [errorMsgShow, setErrorMsgShow] = useState(false);


  useEffect(()=>{
    console.log('login:-',props.loginReducer.signinDetails);
    if(props.loginReducer.signinDetails){
      history.push('/ShowDetails');
    }
  },[props.loginReducer]);

  const checkUserName = (value) => {
    let bool = false;
    if (value === 'admin') {
      bool = true
    }
    else {
      bool = false
    }
    return bool;
  }

  const checkPassword = (value) => {
    let bool = false;
    if (value === '1234') {
      bool = true
    }
    else {
      bool = false
    }
    return bool;
  }

  const onLogin = () => {
    if (checkUserName(username)) {
      if (checkPassword(userPassword)) {
        setUserLoginStatus(true);
        dispatch(loginAction(true));
        setErrorMsgShow(false);
        setErrorMsg(null);
        // dispatch(userDetailsListAction(
        //   [
        //     {
        //       id: 0,
        //       details: [
        //         { id: 1, title: 'FirstName', value: 'Amar' },
        //         { id: 2, title: 'Last Name', value: 'Perera' },
        //         { id: 3, title: 'Date of Birth', value: '1995-02-01' },
        //         { id: 4, title: 'Age', value: '28' },
        //         {
        //           id: 5, title: 'Language', value: [
        //             { id: 1, value: 'English', selected: true },
        //             { id: 2, value: 'Sinhala', selected: true },
        //             { id: 3, value: 'Tamil', selected: false }
        //           ]
        //         },
        //         { id: 6, title: 'Gender', value: 'Male' },
        //         { id: 7, title: 'Email', value: 'Amar1995@gmail.com' },
        //         { id: 8, title: 'Telephone', value: '0710000000' }
        //       ]
        //     }
        //   ]
        // ));
        // history.push("/ShowDetails");
        dispatch(userDetailsListAction([]));
      }
      else {
        setUserLoginStatus(false);
        dispatch(loginAction(false));
        setErrorMsgShow(true);
        setErrorMsg('Incorrect Password')
      }
    }
    else {
      setUserLoginStatus(false);
      dispatch(loginAction(false));
      setErrorMsgShow(true);
      setErrorMsg('Incorrect UserName')
    }
  }

  useEffect(() => {
    if (userLoginStatus) {
      history.push("/ShowDetails");
    }
  }, [userLoginStatus, history]);

  return (
    <div
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Row
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          // borderColor:'red',
          // borderWidth:1,
          // borderStyle:'solid'
        }}
      >
        <Col>
          <Row
            style={{
              paddingBottom: 10
            }}
          >
            <h3>UserName</h3>
            <input name='name' onChange={(e) => { console.log(e.target.value); setUserName(e.target.value) }} />
          </Row>
          <Row
            style={{
              paddingBottom: 10
            }}
          >
            <h3>Password</h3>
            <input name='password' type='password' onChange={(e) => { console.log(e.target.value); setUserPassword(e.target.value) }} />
          </Row>
          <Row>
            <Button onClick={() => onLogin()}>Login</Button>
          </Row>
          {errorMsg != null && errorMsgShow ?
            <Row>
              <h5 style={{ color: 'red' }}>{errorMsg}</h5>
            </Row>
            : <></>
          }
        </Col>
      </Row>
    </div>
  )
}

// export default withRouter(Login);

const mapStateToProps = state => ({
  ...state
});

// const mapDispatchToProps = dispatch => ({
//   userDetailsListRedux: (payload) => dispatch(userDetailsListAction(payload)),
//   setSelectedUserActionRedux: (payload) => dispatch(setSelectedUserAction(payload)),
//   setIsNewUserFormActionRedux: (payload) => dispatch(setIsNewUserFormAction(payload))
// });

export default withRouter(connect(mapStateToProps)(Login));