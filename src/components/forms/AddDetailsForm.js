import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from "react-router-dom";
import { Button, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { connect } from "react-redux";
import { userDetailsListAction, setIsNewUserFormAction, setSelectedUserAction } from '../../redux/actions/user_details_action';
import { validatePhoneNumber } from '../../validations/phoneNoValidation';
import { validateEmailAddress } from '../../validations/emailValidation';
import CutomInputField from '../elements/CutomInputField';
import CustomCheckboxField from '../elements/CustomCheckboxField';
import CustomRadioField from '../elements/CustomRadioField';
import { alertService } from '../../services/alert.service';

const formSyles = {
  rowStyle: {
    paddingBottom: 30,
    width: '40%',
  }
};

// const languageCheckList=[
//   {id:1,value:'English',selected:false},
//   {id:2,value:'Sinhala',selected:false},
//   {id:3,value:'Tamil',selected:false}
// ];

const genderList = [
  { id: 1, value: 'Male' },
  { id: 2, value: 'Female' },
  { id: 3, value: 'Other' }
]


function AddDetailsForm(props) {

  const history = useHistory();
  const [passUserDetails, setPassUserDetails] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [selectedGender, setSelectedGender] = useState(null);
  const [languageCheckList, setLanguageCheckList] = useState([
    { id: 1, value: 'English', selected: false },
    { id: 2, value: 'Sinhala', selected: false },
    { id: 3, value: 'Tamil', selected: false }
  ]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedDOB, setSelectedDOB] = useState(null);
  const [age, setAge] = useState(null);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [isfillAllFeildError, setIsfillAllFeildError] = useState(false);

  const handleInputPhoneNumberChange = (e) => {
    const inputValue = e;
    const cleanedInput = inputValue.replace(/\D/g, '');
    setPhoneNumber(cleanedInput);
    let valid = validatePhoneNumber(cleanedInput);
    setIsValid(valid);
  };

  const handleEmailChange = (e) => {
    const newEmail = e;
    setEmail(newEmail);

    const isValid = validateEmailAddress(newEmail);

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
        console.log('add-- lan:-',lan.value);
        setLanguageCheckList(lan.value);
      }
      else {
        setSelectedLanguage([]);
      }
    }
  }

  const setLanguageList=(item)=>{
    console.log('setLanguageList:-',item);
    if(item && languageCheckList){
      for (let i = 0; i < languageCheckList.length; i+=1) {
        if(languageCheckList[i].id===item.id){
          languageCheckList[i].selected=!languageCheckList[i].selected
        }
      }
      console.log('----------languageCheckList:-',languageCheckList);
      setLanguageCheckList([...languageCheckList]);
      setSelectedLanguage([...languageCheckList]);
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

  const calculateAge = () => {
    const dobDate = new Date(selectedDOB);
    const today = new Date();

    const ageDifference = today.getFullYear() - dobDate.getFullYear();

    if (
      today.getMonth() < dobDate.getMonth() ||
      (today.getMonth() === dobDate.getMonth() && today.getDate() < dobDate.getDate())
    ) {
      setAge(ageDifference - 1); // Subtract 1 if the birthday hasn't occurred yet
    } else {
      setAge(ageDifference);
    }
  };

  useEffect(() => {
    if (selectedDOB && selectedDOB !== null) {
      calculateAge();
    }
  }, [selectedDOB]);

  const getDOB = (details) => {
    console.log('----------------getDOB:-', details);
    if (details && details !== null) {
      let dob = details.find(a => a.id === 3);
      if (dob) {
        setSelectedDOB(new Date(dob.value));
      }
    }
  }

  const getUserAge = (details) => {
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
        let valid = validatePhoneNumber(tele.value)
        setIsValid(valid)
      }

    }
  }


  useEffect(() => {
    setPassUserDetails(props.userDetailsReducer.selectedUserDetails);

    if (props.userDetailsReducer.isNewUserForm === false && props.userDetailsReducer.selectedUserDetails !== null) {
      getSelectedLanguage(props.userDetailsReducer.selectedUserDetails.details);
      getSelectedGender(props.userDetailsReducer.selectedUserDetails.details);
      getFirstName(props.userDetailsReducer.selectedUserDetails.details);
      getLastName(props.userDetailsReducer.selectedUserDetails.details);
      getDOB(props.userDetailsReducer.selectedUserDetails.details);
      getUserAge(props.userDetailsReducer.selectedUserDetails.details);
    }

  }, [props.userDetailsReducer]);

  const onGoBack = () => {
    history.push('/ShowDetails');
  }

  const checkAllString = (value) => {
    let bool = false;
    if (value && value !== null && value !== ' ') {
      bool = true
    }
    return bool;
  }

  const setDetailsToRedux = () => {
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

    let newList = props.userDetailsReducer.userDetailsList;

    if (userDetailsToPass) {
      if (props.userDetailsReducer.isNewUserForm) {
        let obj = {
          id: newList.length,
          details: userDetailsToPass
        }
        newList.push(obj);
      }
      else {
        if (newList && newList.length > 0) {
          for (let i = 0; i < newList.length; i++) {
            if (props.userDetailsReducer.selectedUserDetails.id === newList[i].id) {
              newList[i].details = userDetailsToPass
              console.log('------newList ', newList);
            }
          }
        }
      }
      props.userDetailsListRedux(newList);
    }
  }

  const findLanguageCheckValidation=()=>{
    let bool=false;
    let lan = selectedLanguage.find(a=>a.selected);
    if(lan){
      bool=true
    }
    else{
      bool=false
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
      findLanguageCheckValidation(selectedLanguage) &&
      checkAllString(selectedGender) &&
      checkAllString(email) &&
      checkAllString(phoneNumber)
    ) {
      console.log('-------------------');
      alertService.success("Successfully ----------------");
      setDetailsToRedux();
      history.push('/ShowDetails');
      setIsfillAllFeildError(false);
    }
    else {
      setIsfillAllFeildError(true);
    }
  }

  const phoneNoOnBlur = () => {
    let valid = validatePhoneNumber(phoneNumber);
    setIsValid(valid);
  }

  return (
    <div>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>First Name</h5>
        <CutomInputField name={'firstName'} setValue={setFirstName} value={firstName} inputMode={'default'} onBlur={null} />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Last Name</h5>
        <CutomInputField name={'lastName'} setValue={setLastName} value={lastName} inputMode={'default'} onBlur={null} />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Date of Birth</h5>
        <DatePicker
          selected={selectedDOB ? selectedDOB : ''}
          dateFormat="yyyy-MM-dd"
          onChange={date => { console.log(date); setSelectedDOB(date) }}
        />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Age</h5>
        <CutomInputField name={'age'} setValue={setAge} value={age} inputMode={'numeric'} onBlur={null} />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Language</h5>
        <CustomCheckboxField checkValueList={languageCheckList} name={'language'} selectedValue={selectedLanguage} setValue={setLanguageList} />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Gender</h5>
        <CustomRadioField checkValueList={genderList} name={'gender'} selectedValue={selectedGender} setValue={setSelectedGender} />
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Email</h5>
        <CutomInputField inputMode={'default'} name={'email'} setValue={handleEmailChange} value={email} />
        {email !== '' && !isValidEmail && <p style={{ color: 'red' }}>Please enter a valid email address.</p>}
      </Row>
      <Row
        style={formSyles.rowStyle}
      >
        <h5>Telephone</h5>
        <CutomInputField inputMode={'default'} name={'telephone'} setValue={handleInputPhoneNumberChange} value={phoneNumber} onBlur={phoneNoOnBlur} />

        {phoneNumber !== '' && !isValid && <p style={{ color: 'red' }}>Invalid Phone Number.</p>}
      </Row>
      {isfillAllFeildError ?
        <h6 style={{ color: 'red' }}>Plase fill all the fields</h6>
        : <></>
      }
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

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  userDetailsListRedux: (payload) => dispatch(userDetailsListAction(payload)),
  setSelectedUserActionRedux: (payload) => dispatch(setSelectedUserAction(payload)),
  setIsNewUserFormActionRedux: (payload) => dispatch(setIsNewUserFormAction(payload))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddDetailsForm));