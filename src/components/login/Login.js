import React,{useState,useEffect} from 'react'
import { Row, Col,Button } from 'react-bootstrap';
import {withRouter,useHistory } from "react-router-dom";

function Login() {
  const history = useHistory();
  const [username,setUserName]=useState(null);
  const [userPassword,setUserPassword]=useState(null);
  const [userLoginStatus,setUserLoginStatus]=useState(false);
  const [errorMsg,setErrorMsg]=useState(null);
  const [errorMsgShow,setErrorMsgShow]=useState(false);

  const checkUserName=(value)=>{
    let bool=false;
    if(value==='admin'){
      bool=true
    }
    else{
      bool=false
    }
    return bool;
  }

  const checkPassword=(value)=>{
    let bool=false;
    if(value==='1234'){
      bool=true
    }
    else{
      bool=false
    }
    return bool;
  }

  const onLogin=()=>{
    if(checkUserName(username)){
      if(checkPassword(userPassword)){
        setUserLoginStatus(true);
        setErrorMsgShow(false);
        setErrorMsg(null);
      }
      else{
        setUserLoginStatus(false);
        setErrorMsgShow(true);
        setErrorMsg('Incorrect Password')
      }
    }
    else{
      setUserLoginStatus(false);
      setErrorMsgShow(true);
      setErrorMsg('Incorrect UserName')
    }
  }

  useEffect(()=>{
    if(userLoginStatus){
      history.push("/ShowDetails");
    }
  },[userLoginStatus]);

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
            <input name='password' onChange={(e) => { console.log(e.target.value); setUserPassword(e.target.value) }} />
          </Row>
          <Row>
            <Button onClick={()=>onLogin()}>Login</Button>
          </Row>
          {errorMsg!=null && errorMsgShow?
            <Row>
              <h5>{errorMsg}</h5>
            </Row>
            :<></>
          }
          </Col>
      </Row>
    </div>
  )
}

export default withRouter(Login);