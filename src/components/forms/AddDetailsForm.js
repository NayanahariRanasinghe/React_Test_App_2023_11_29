import React, { useEffect, useState } from 'react'
import { withRouter, useHistory, useLocation } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'

const formSyles = {
  rowStyle: {
    paddingBottom: 30,
    width: '40%',
  }
}


function AddDetailsForm() {

  const history = useHistory();
  const location = useLocation();
  const [passUserDetails, setPassUserDetails] = useState(null);
  const [isNewForm,setIsNewForm]=useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedDOB, setSelectedDOB] = useState(null);
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isfillAllFeildError, setIsfillAllFeildError] = useState(false);


  const validatePhoneNumber = () => {
    // Regular expression for Sri Lankan phone numbers
    const phoneRegex = /^(?:\+94|0)([1-9][0-9]{8})$/;
    setIsValid(!phoneRegex.test(phoneNumber));
    console.log('validatePhoneNumber', phoneRegex.test(phoneNumber));
  };

  const handleInputPhoneNumberChange = (e) => {
    const inputValue = e.target.value;
    // Replace any non-digit characters
    const cleanedInput = inputValue.replace(/\D/g, '');
    setPhoneNumber(cleanedInput);
    validatePhoneNumber();
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(newEmail);

    setIsValidEmail(isValid);
  };

  const getSelectedGender = (details) => {
    if (details && details !== null) {
      let lan = details.find(a => a.id === 6)
      if (lan) {
        setSelectedGender(lan.value);
      }
      else {
        setSelectedGender(null);
      }
    }
  }

  const getSelectedLanguage = (details) => {
    if (details && details !== null) {
      let lan = details.find(a => a.id === 5)
      if (lan) {
        setSelectedLanguage(lan.value);
      }
      else {
        setSelectedLanguage(null);
      }
    }
  }

  const getFirstName = (details) => {
    console.log('+_+++++++++++++++');
    if (details && details !== null) {
      let name = details.find(a => a.id === 1);
      console.log('getFirstName:-', name);
      if (name) {
        setFirstName(name.value);
      }
    }
  }

  const getLastName = (details) => {
    if (details && details !== null) {
      let name = details.find(a => a.id === 2);
      console.log('getLastName:-', name);
      if (name) {
        setLastName(name.value);
      }
    }
  }

  const getDOB = (details) => {
    if (details && details !== null) {
      let dob = details.find(a => a.id === 3);
      if (dob) {
        setSelectedDOB(new Date(dob.value));
      }
    }
  }

  const getAge = (details) => {
    if (details && details !== null) {
      let age = details.find(a => a.id === 4);
      if (age) {
        setAge(age.value);
      }

      let emailPass = details.find(a => a.id === 7);
      if (emailPass) {
        setEmail(emailPass.value);
      }

      let tele = details.find(a => a.id === 8);
      if (tele) {
        setPhoneNumber(tele.value);
        validatePhoneNumber();
      }
    }
  }


  useEffect(() => {
    let isNewForm = location.state?.isNewForm;
    let userDetailsList = location.state?.userDetailsList;
    console.log('isNewForm:-', isNewForm);
    console.log('userDetailsList:-', userDetailsList);
    setIsNewForm(isNewForm);
    setPassUserDetails(userDetailsList);
    if (!isNewForm && userDetailsList !== null) {
      console.log('------------------------');
      getSelectedLanguage(userDetailsList);
      getSelectedGender(userDetailsList);
      getFirstName(userDetailsList);
      getLastName(userDetailsList);
      getDOB(userDetailsList);
      getAge(userDetailsList);
    }
  }, [location.state]);

  const onGoBack = () => {
    history.push('/ShowDetails',{userDetailsToPass:passUserDetails});
  }

  const checkAllString = (value) => {
    let bool = false;
    if (value && value !== null && value !== ' ') {
      bool = true
    }
    return bool;
  }

  const onSubmit = () => {
    if (
      checkAllString(firstName) &&
      checkAllString(lastName) &&
      checkAllString(lastName) &&
      checkAllString(moment(selectedDOB).format('yyyy-mm-dd')) &&
      checkAllString(age) &&
      checkAllString(selectedLanguage) &&
      checkAllString(selectedGender) &&
      checkAllString(email) &&
      checkAllString(phoneNumber)
    ) {
      let userDetailsToPass = [
        { id: 1, title: 'FirstName', value: firstName },
        { id: 2, title: 'Last Name', value: lastName },
        { id: 3, title: 'Date of Birth', value: moment(selectedDOB).format('YYYY-MM-DD') },
        { id: 4, title: 'Age', value: age },
        { id: 5, title: 'Language', value: selectedLanguage },
        { id: 6, title: 'Gender', value: selectedGender },
        { id: 7, title: 'Email', value: email },
        { id: 8, title: 'Telephone', value: phoneNumber }
      ];
      history.push('/ShowDetails',{userDetailsToPass:userDetailsToPass});
      setIsfillAllFeildError(false);
    }
    else {
      setIsfillAllFeildError(true);
    }
  }

  return (
    <div>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>First Name</h5>
        <input name='firstName' value={firstName && firstName !== null ? firstName : ''} onChange={(e) => { console.log(e.target.value); setFirstName(e.target.value); }} />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Last Name</h5>
        <input name='lastName' value={lastName && lastName !== null ? lastName : ''} onChange={(e) => { console.log(e.target.value); setLastName(e.target.value); }} />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Date of Birth</h5>
        {/* <input name='dob' onChange={(e) => { console.log(e.target.value);  }} /> */}
        <DatePicker
          // className={"form-control form-control-sm form__field" + cuslist + " "+this.state.warningclses} 
          selected={selectedDOB ? selectedDOB : new Date()}
          dateFormat="yyyy-MM-dd"
          // onBlur={e => this.handleValidate(e.target.value)} 
          onChange={date => { console.log(date); setSelectedDOB(date) }}
        // disabled={this.props.disabled}

        />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Age</h5>
        <input name='age' value={age} inputMode='numeric' onChange={(e) => { console.log(e.target.value); setAge(e.target.value) }} />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Language</h5>
        <label><input name='language' type='checkbox' value='English'  checked={selectedLanguage && selectedLanguage === 'English' ? true : false} onChange={(e) => { console.log(e.target.value); setSelectedLanguage('English'); }} /> English</label>
        <label><input name='language' type='checkbox' value='Sinhala' checked={selectedLanguage && selectedLanguage === 'Sinhala' ? true : false} onChange={(e) => { console.log(e.target.value); setSelectedLanguage('Sinhala');}} /> Sinhala</label>
        <label><input name='language' type='checkbox' value='tamil' checked={selectedLanguage && selectedLanguage === 'Tamil' ? true : false} onChange={(e) => { console.log(e.target.value); setSelectedLanguage('Tamil');}} /> Tamil</label>
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Gender</h5>
        <label><input name='gender' type='radio' value='male' checked={selectedGender && selectedGender === 'Male' ? true : false} onChange={(e) => { console.log(e.target.value); setSelectedGender('Male');}} /> Male</label>
        <label><input name='gender' type='radio' value='female' checked={selectedGender && selectedGender === 'Female' ? true : false} onChange={(e) => { console.log(e.target.value); setSelectedGender('Female'); }} /> Female</label>
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Email</h5>
        <input name='email' value={email} onChange={(e) => { console.log(e.target.value); handleEmailChange(e); }} />
        {email !== '' && !isValidEmail && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Telephone</h5>
        {/* <input name='telephone' onChange={(e) => { console.log(e.target.value);  }} /> */}
        {/* <label>
          Enter Sri Lankan Phone Number: */}
        <input
          type="text"
          value={phoneNumber}
          onChange={handleInputPhoneNumberChange}
          onBlur={validatePhoneNumber}
        />
        {/* </label> */}
        {/* { isValid ? (
          <p style={{ color: 'green' }}>Valid Phone Number</p>
        ) : (
          <p style={{ color: 'red' }}>Invalid Phone Number</p>
        )} */}
        {phoneNumber !== '' && !isValid && <p style={{ color: 'red' }}>Invalid Phone Number.</p>}
      </Row>
      {/* <Row> */}
        {isfillAllFeildError ?
          <h6 style={{ color: 'red' }}>Plase fill all the fields</h6>
          : <></>
        }
      {/* </Row> */}
      <Row
        style={{
          // ...formSyles.rowStyle,
          display: 'flex'
        }}
      >
        <Col
          style={{
            padding: 10
          }}
        >
          <Button onClick={() => onGoBack()}>Back</Button>
        </Col>
        <Col
          style={{
            padding: 10
          }}
        >
          <Button onClick={() => onSubmit()} >Submit</Button>
        </Col>
      </Row>
    </div>
  )
}

export default withRouter(AddDetailsForm);