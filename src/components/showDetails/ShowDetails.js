import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { userDetailsListAction, setIsNewUserFormAction, setSelectedUserAction } from '../../redux/actions/user_details_action';
import { loginAction } from '../../redux/actions/login_action';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function ShowDetails(props) {

  const history = useHistory();
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    if (props.userDetailsReducer.userDetailsList && props.userDetailsReducer.userDetailsList.length > 0) {
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
        paddingBottom: 30
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
              <Col style={{ flex: 0.2 }}>{userDetail.title}</Col>
              <Col style={{ flex: 0.05 }}>{':'}</Col>
              <Col style={{ flex: 0.3 }}>
                {userDetail.id === 5 ?
                  <>
                    {userDetail.value.map((lan) =>
                      <li key={lan.id}
                        style={{
                          listStyleType: 'none',
                        }}
                      >{lan.selected ? lan.value : ''}</li>
                    )}
                  </>
                  :
                  <>{userDetail.value}</>
                }
              </Col>
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

  const onLogOut = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            // alert('Click Yes')
            props.loginActionRedux(false);
            history.push("/");
          }
        },
        {
          label: 'No',
          onClick: () => {
            // alert('Click No')
          }
        }
      ]
    });
  }

  return (<>
    <Col>
      <Button onClick={onLogOut} >Log out</Button>
    </Col>
    {userDetails && userDetails.length > 0 ?
      <div>
        <Row
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Col>
            <h3>Users List</h3>
          </Col>
        </Row>

        <ul>
          {usersList}
        </ul>

      </div>
      : <></>}
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
  </>
  )
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  userDetailsListRedux: (payload) => dispatch(userDetailsListAction(payload)),
  setSelectedUserActionRedux: (payload) => dispatch(setSelectedUserAction(payload)),
  setIsNewUserFormActionRedux: (payload) => dispatch(setIsNewUserFormAction(payload)),
  loginActionRedux: (payload) => dispatch(loginAction(payload))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ShowDetails));