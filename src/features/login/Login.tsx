import React from 'react';
import './Login.scss'

const Login = () => {

  return (
      <div className="container">
        <div className="box">
          <h2>Login</h2>
          <form action="">
            <div className="inputBox">
              <input type="text" required={false}/>
              <label>User Name</label>
            </div>
            <div className="inputBox">
              <input type="password" required={false}/>
              <label>Password</label>
            </div>
            <input type="submit" value="Submit"/>
          </form>
        </div>
      </div>
  )
};

export default Login;
