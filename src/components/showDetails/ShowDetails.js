import React from 'react'
import { withRouter,useHistory } from "react-router-dom";
import { Row, Col, Button } from 'react-bootstrap';

const userDetails = [
  { id: 1, title: 'FirstName', value: 'Amar' },
  { id: 2, title: 'Last Name', value: 'Perera' },
  { id: 3, title: 'Date of Birth', value: '1995-02-01' },
  { id: 4, title: 'Age', value: '28' },
  { id: 5, title: 'Language', value: 'sinhala' },
  { id: 6, title: 'Gender', value: 'Male' },
  { id: 7, title: 'Email', value: 'Amar1995@gmail.com' },
  { id: 8, title: 'Telephone', value: '0710000000' }
];

function ShowDetails() {

  const history= useHistory();


  const listItems = userDetails.map(userDetail =>
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
  );


  const onClickHandle=(isNew)=>{
    if(isNew){
      history.push("/AddDetailsForm",{isNewForm:true,userDetailsList:null})
    }
    else{
      history.push("/AddDetailsForm",{isNewForm:false,userDetailsList:userDetails})
    }
  }

  return (
    <div>
      <ul>
        {listItems}
      </ul>
      <Row 
        style={{
          paddingTop:10,
          paddingBottom:10,
          display:'flex'
        }}
      >
        <Col
          style={{
            marginRight:10,
            marginLeft:10
          }}
        >
          <Button>Add New</Button>
        </Col>
        <Col
           style={{
            marginRight:10,
            marginLeft:10
          }}
        >
          <Button>Edit</Button>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(ShowDetails);