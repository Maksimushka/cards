import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import './Login.scss'
import Input from '../../components/input/Input';
import Checkbox from '../../components/checkbox/Checkbox';
import {Link} from 'react-router-dom';
import {PATH} from '../../main/ui/routes/Routes';

const Login: FC<any> = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [validPassword, setValidPassword] = useState<boolean>(false)


  const changeEmail = ({target}: ChangeEvent<HTMLInputElement>) => {
    setValidEmail(false)
    setEmail(target.value)
  }

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValidPassword(false)
    setPassword(e.target.value)
  }
  const onSubmit = () => {
    const pattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (!pattern.test(email)) {
      setValidEmail(true)
    }
    if (password.length < 6) {
      setValidPassword(true)
    }
  }

  return (
      <section className='login'>
        <div className='login__container'>
        <div>
          <h2>Login</h2>
          Email
          <Input type={'email'} value={email} onChange={changeEmail}/>
          Password
          <Input type={'password'} value={password} onChange={changePassword}/>
        </div>
        {validEmail && <p className="error">Enter valid email</p>}
        {validPassword && <p className="error">Enter longer password more then 6 symbols Now: {password.length}</p>}
        <Link to={PATH.SIGNUP}>Sign Up (Registration)</Link>
        <Checkbox>Remember me!</Checkbox>
        <button onClick={onSubmit}>Submit</button>
        </div>
      </section>
  )
};

export default Login;
