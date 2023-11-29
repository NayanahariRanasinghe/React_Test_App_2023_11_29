import React,{useEffect} from 'react'
import {withRouter } from "react-router-dom";

function AddDetailsForm({isNewForm,userDetailsList}) {

  useEffect(()=>{
    console.log('isNewForm:-',isNewForm);
    console.log('userDetailsList:-',userDetailsList);
  },[isNewForm,userDetailsList])

  return (
    <div>AddDetailsForm</div>
  )
}

export default withRouter(AddDetailsForm);