import React, {useState,setState} from 'react';
import './style.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
function RegistrationForm() {

    const [formValue, setformValue] = React.useState({
        userName: '',
        password: '',
        name:'',
        address:'',
        loanAccountNumber:'',
      
      });

      
      const handleSubmit = async(event) => {
          //event.preventDefault();
          console.log("Reached inside submit")
          for (const [key, value] of Object.entries(formValue)) {
            if (!value) {
                alert(`Please enter ${key}`);
                return;
            }
        }
    
        // check for valid email using regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formValue.email)) {
            alert('Please enter a valid email address');
            return;
        }
        // store the states in the form data
        let loginFormData =  new FormData();
        loginFormData.append("userName", formValue.userName)
        loginFormData.append("password", formValue.password)
        loginFormData.append("name", formValue.name)
        loginFormData.append("address", formValue.address)
        loginFormData.append("email", formValue.email)
        loginFormData.append("mobileNumber", formValue.mobileNumber)
        loginFormData.append("loanAccountNumber", formValue.loanAccountNumber)
        loginFormData.append("loanInformation", formValue.loanInformation)
        loginFormData.append("client", formValue.role)
      console.log("Value of formdata"+JSON.stringify(loginFormData))
        try {
          // make axios post request
          const response = await axios({
            method: "post",
            url: "http://localhost:61865/registration/client",
            data: loginFormData,
            headers: { "Content-Type": "multipart/form-data" },
          });
          if (response.status === 201) {
            window.location.href = "/login";
        }
      
        } catch(error) {
          console.log(error)
        }
      }
    
      const handleChange = (event) => {
          console.log("Reached here"+event)
        setformValue({
          ...formValue,
          [event.target.name]: event.target.value
        });
      }
  
    return(
      <div className="form">
          <div className="form-body">
            <h1>Client Registration</h1>
              <div className="userName">
                  <label className="form__label" for="name"> Name </label>
                  <input className="form__input" type="text" id="name"  name="name" onChange={handleChange} placeholder="Name"/>
              </div>
              <div className="address">
                  <label className="form__label" for="address">Address </label>
                  <input  type="text" name="" id="address"  className="form__input" name="address" onChange={handleChange} placeholder="Address"/>
              </div>
              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input  type="email" id="email" className="form__input"   name="email" onChange={handleChange} placeholder="Email"/>
              </div>
              <div className="mobileNumber">
                  <label className="form__label" for="mobileNumber">Mobile Number </label>
                  <input  type="mobileNumber" id="mobileNumber" className="form__input"  name="mobileNumber" onChange={handleChange} placeholder="Mobile Number"/>
              </div>
             
              <div className="loan-accountNumber">
                  <label className="form__label" for="loanAccountNumber">LoanAccountNumber </label>
                  <input className="form__input" type="loanAccountNumber" id="loanAccountNumber" name="loanAccountNumber" onChange={handleChange} placeholder="LoanAccountNumber"/>
              </div>
              <div className="loan-information">
                  <label className="form__label" for="loanInformation">LoanInformation </label>
                  <input className="form__input" type="loanInformation" id="loanInformation" name="loanInformation" onChange={handleChange} placeholder="LoanInformation"/>
              </div>
              <div className="userName">
                  <label className="form__label" for="userName">UserName </label>
                  <input className="form__input" type="userName"  id="userName" name="userName"  onChange={handleChange} placeholder="UserName"/>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password"  id="password" name="password" onChange={handleChange} placeholder="Password"/>
              </div>
          </div>
          <div class="footer">
                <button onClick={()=>handleSubmit()}  class="btn">Register</button>
            </div>
            <Link to="/supplier">
        <button>Supplier Registration</button>
      </Link>
      <Link to="/login">
        <button>Login</button>
      </Link>
      </div>    
    )   
    
}

export default RegistrationForm;
