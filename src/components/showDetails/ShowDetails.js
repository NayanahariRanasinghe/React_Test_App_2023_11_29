import React, { useEffect, useState } from 'react'
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { userDetailsListAction } from '../../redux/actions/user_details_action';

function ShowDetails(props) {

  const history = useHistory();
  const location = useLocation();
  const [userDetails, setUserDetails] = useState(
    [
      {
        id: 0,
        details: [
          { id: 1, title: 'FirstName', value: 'Amar' },
          { id: 2, title: 'Last Name', value: 'Perera' },
          { id: 3, title: 'Date of Birth', value: '1995-02-01' },
          { id: 4, title: 'Age', value: '28' },
          { id: 5, title: 'Language', value: 'Sinhala' },
          { id: 6, title: 'Gender', value: 'Male' },
          { id: 7, title: 'Email', value: 'Amar1995@gmail.com' },
          { id: 8, title: 'Telephone', value: '0710000000' }
        ]
      }
    ]
  );

  useEffect(() => {
    console.log('props.userDetailsReducer:-', props.userDetailsReducer.userDetailsList);
    if (props.userDetailsReducer.userDetailsList && props.userDetailsReducer.userDetailsList.length > 0) {
      console.log('----------------------------');
      setUserDetails(props.userDetailsReducer.userDetailsList);
    }
  }, [props.userDetailsReducer.userDetailsList]);

  useEffect(() => {
    console.log(' userDetails:-', userDetails);
  }, [userDetails]);


  useEffect(() => {
    let userDetailsToPass = location.state?.userDetailsToPass;
    let isNewForm = location.state?.isNewForm;
    let selectedUserId = location.state?.selectedUserId;
    console.log('userDetailsToPass:-', userDetailsToPass, isNewForm, selectedUserId);
    if (userDetailsToPass) {
      if (isNewForm) {
        let obj = {
          id: userDetails.length,
          details: userDetailsToPass
        }
        userDetails.push(obj);
      }
      else {
        if (userDetails && userDetails.length > 0) {
          for (let i = 0; i < userDetails.length; i++) {
            if (selectedUserId === userDetails[i].id) {
              userDetails.details = userDetailsToPass
              console.log('------userDetails ',userDetails);
            }
          }
        }
      }
      setUserDetails([...userDetails]);
    }
  }, [location.state]);


  // const listItems = userDetails.map(userDetail =>
  //   <li key={userDetail.id}
  //     style={{
  //       listStyleType: 'none',
  //       // color: 'red'
  //     }}
  //   >
  //     <Row
  //       style={{
  //         display: 'flex',
  //         paddingBottom: 10
  //       }}
  //     >
  //       <Col style={{ flex: 0.1 }}>{userDetail.title}</Col>
  //       <Col style={{ flex: 0.05 }}>{':'}</Col>
  //       <Col style={{ flex: 0.3 }}>{userDetail.value}</Col>
  //     </Row>
  //   </li>
  // );

  const onClickHandle = (isNew, user) => {
    console.log(isNew);
    if (isNew) {
      history.push("/AddDetailsForm", { isNewForm: true, userDetailsList: null })
    }
    else {
      history.push("/AddDetailsForm", { isNewForm: false, userDetailsList: user })
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
  userDetailsListRedux: (payload) => dispatch(userDetailsListAction(payload))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowDetails));