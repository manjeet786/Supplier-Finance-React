import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [formValue, setformValue] = useState({
    userName: '',
    password: '',
  });

  const [loginStatus, setLoginStatus] = useState(null);

  const handleSubmit = async (event) => {

    for (const [key, value] of Object.entries(formValue)) {
      if (!value) {
          alert(`Please enter ${key}`);
          return;
      }
    }
   // event.preventDefault();
    try {
      // make axios post request to log in the user
      const response = await axios.post('http://localhost:61865/login/clientInfo', {
        userName: formValue.userName,
        password: formValue.password,
      });
      console.log(response.data);
      // set login status based on the response
      setLoginStatus(response.data);
      if (response.status === 200) {
        window.location.href = "/upload-invoice";
    }
    } 
    catch (error) {
      console.log(error);
      setLoginStatus(false);
    }
  };

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="form">
      <div className="form-body">
          <h3>Login</h3>
        <div className="userName">
          <label className="form__label" htmlFor="userName">
            UserName
          </label>
          <input
            className="form__input"
            type="text"
            id="userName"
            name="userName"
            onChange={handleChange}
            placeholder="UserName"
          />
        </div>
        <div className="password">
          <label className="form__label" htmlFor="password">
            Password
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
      </div>
      <div className="footer">
        <button onClick={handleSubmit} className="btn">
          Login
        </button>
      </div>
      {loginStatus === true && <p>Login successful</p>}
      {loginStatus === false && <p>Login failed</p>}
    </div>
  );
}

export default LoginForm;
