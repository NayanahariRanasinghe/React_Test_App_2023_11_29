import React, { useEffect, useState } from 'react'
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { userDetailsListAction,setIsNewUserFormAction,setSelectedUserAction } from '../../redux/actions/user_details_action';

function ShowDetails(props) {

  const history = useHistory();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    // console.log('props.userDetailsReducer:-', props.userDetailsReducer.userDetailsList);
    if (props.userDetailsReducer.userDetailsList && props.userDetailsReducer.userDetailsList.length > 0) {
      // console.log('--ShowDetails--------------------------');
      setUserDetails(props.userDetailsReducer.userDetailsList);
    }
  }, [props.userDetailsReducer]);


  const onClickHandle = (isNew, user) => {
    console.log(isNew);
    if (isNew) {
      props.setSelectedUserActionRedux(null);
      props.setIsNewUserFormActionRedux(true);
      history.push("/AddDetailsForm")
    }
    else {
      props.setSelectedUserActionRedux(user);
      props.setIsNewUserFormActionRedux(false);
      history.push("/AddDetailsForm")
    }
  }

  const usersList = userDetails.map(user =>
    <li key={user.id} 
      style={{
        paddingBottom:30
      }}
    >
      <ul>
        {user.details.map(userDetail =>
          <li key={userDetail.id}
            style={{
              listStyleType: 'none',
              // color: 'red'
            }}
          >
            <Row
              style={{
                display: 'flex',
                paddingBottom: 10
              }}
            >
              <Col style={{ flex: 0.1 }}>{userDetail.title}</Col>
              <Col style={{ flex: 0.05 }}>{':'}</Col>
              <Col style={{ flex: 0.3 }}>{userDetail.value}</Col>
            </Row>
          </li>
        )}
      </ul>
      <Col
        style={{
          marginRight: 10,
          marginLeft: 10
        }}
      >
        <Button onClick={() => onClickHandle(false, user)}>Edit</Button>
      </Col>
    </li>
  );

  return (userDetails && userDetails.length > 0 ?
    <div>
      <h3>Users List</h3>
      <ul>
        {usersList}
      </ul>
      <Row
        style={{
          paddingTop: 10,
          paddingBottom: 10,
          display: 'flex'
        }}
      >
        <Col
          style={{
            marginRight: 10,
            marginLeft: 10
          }}
        >
          <Button onClick={() => onClickHandle(true, null)}>Add New</Button>
        </Col>
      </Row>
    </div>
    : <></>
  )
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  userDetailsListRedux: (payload) => dispatch(userDetailsListAction(payload)),
  setSelectedUserActionRedux: (payload) => dispatch(setSelectedUserAction(payload)),
  setIsNewUserFormActionRedux: (payload) => dispatch(setIsNewUserFormAction(payload))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowDetails));