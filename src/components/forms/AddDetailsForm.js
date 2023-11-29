import React, { useEffect, useState } from 'react'
import { withRouter } from "react-router-dom";
import { Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const formSyles = {
  rowStyle: {
    paddingBottom: 30,
    width: '40%',
  }
}


function AddDetailsForm({ isNewForm, userDetailsList }) {

  const [passUserDetails, setPassUserDetails] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedDOB, setSelectedDOB] = useState(null);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    // Replace any non-digit characters
    const cleanedInput = inputValue.replace(/\D/g, '');
    setPhoneNumber(cleanedInput);
  };

  const validatePhoneNumber = () => {
    // Regular expression for Sri Lankan phone numbers
    const phoneRegex = /^(0|\+94)(7([1-9]))\d{7}$/;
    setIsValid(phoneRegex.test(phoneNumber));
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

  useEffect(() => {
    console.log('isNewForm:-', isNewForm);
    console.log('userDetailsList:-', userDetailsList);
    if (userDetailsList !== null) {
      setPassUserDetails(userDetailsList);
      getSelectedLanguage(userDetailsList);
      getSelectedGender(userDetailsList);
    }
  }, [isNewForm, userDetailsList])

  return (
    <div>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>First Name</h5>
        <input name='firstName' onChange={(e) => { console.log(e.target.value); }} />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Last Name</h5>
        <input name='lastName' onChange={(e) => { console.log(e.target.value); }} />
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
        <input name='age' inputMode='numeric' onChange={(e) => { console.log(e.target.value); }} />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Language</h5>
        <label><input name='language' type='checkbox' value='English' checked={selectedLanguage && selectedLanguage === 'English' ? true : false} onChange={(e) => { console.log(e.target.value); }} /> English</label>
        <label><input name='language' type='checkbox' value='Sinhala' checked={selectedLanguage && selectedLanguage === 'Sinhala' ? true : false} onChange={(e) => { console.log(e.target.value); }} /> Sinhala</label>
        <label><input name='language' type='checkbox' value='tamil' checked={selectedLanguage && selectedLanguage === 'Tamil' ? true : false} onChange={(e) => { console.log(e.target.value); }} /> Tamil</label>
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Gender</h5>
        <label><input name='gender' type='radio' value='male' checked={selectedGender && selectedGender === 'Male' ? true : false} onChange={(e) => { console.log(e.target.value); }} /> Male</label>
        <label><input name='gender' type='radio' value='female' checked={selectedGender && selectedGender === 'Female' ? true : false} onChange={(e) => { console.log(e.target.value); }} /> Female</label>
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Email</h5>
        <input name='email' onChange={(e) => { console.log(e.target.value); handleEmailChange(e); }} />
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
            onChange={handleInputChange}
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
    </div>
  )
}

export default withRouter(AddDetailsForm);