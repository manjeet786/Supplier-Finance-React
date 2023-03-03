import React, {useState,setState} from 'react';
import './style.css'
import axios from 'axios';
function RegistrationForm() {

    const [formValue, setformValue] = React.useState({
        name: '',
        address:'',
        email:'',
        mobileNumber:'',
        creditAccountNumer:'',
        creditInformation:'',
        username:'',
        password:''
      });
    
      const handleSubmit = async(event) => {
        for (const [key, value] of Object.entries(formValue)) {
          if (!value) {
              alert(`Please enter ${key}`);
              return;
          }
        }
          //event.preventDefault();
          console.log("Reached inside submit")
        // store the states in the form data
        let loginFormData =  new FormData();
        loginFormData.append("name", formValue.name)
        loginFormData.append("address", formValue.address)
        loginFormData.append("email", formValue.email)
        loginFormData.append("mobileNumber", formValue.mobileNumber)
        loginFormData.append("creditAccountNumer", formValue.creditAccountNumer)
        loginFormData.append("creditInformation", formValue.creditInformation)
        loginFormData.append("username", formValue.username)
        loginFormData.append("password", formValue.password)
      console.log("Value of formdata"+JSON.stringify(loginFormData))
        try {
          // make axios post request
          const response = await axios({
            method: "post",
            url: "http://localhost:61865/registration/supplier",
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
              <h2>Supplier Registration</h2>
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
                  <label className="form__label" for="creditAccountNumer">CreditAccountNumer </label>
                  <input className="form__input" type="creditAccountNumer" id="creditAccountNumer" name="creditAccountNumer" onChange={handleChange} placeholder="CreditAccountNumer"/>
              </div>
              <div className="loan-information">
                  <label className="form__label" for="creditInformation">CreditInformation </label>
                  <input className="form__input" type="creditInformation" id="creditInformation" name="creditInformation" onChange={handleChange} placeholder="CreditInformation"/>
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
      </div>    
    )   
    
}

export default RegistrationForm;
