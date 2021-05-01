import React, {ChangeEvent, FC, useState} from 'react';
import './Login.scss'
import Input from '../../components/input/Input';
import Checkbox from '../../components/checkbox/Checkbox';
import {Link, Redirect} from 'react-router-dom';
import {PATH} from '../../main/ui/routes/Routes';
import {authAPI} from '../../main/dal/API';
import Spinner from '../../components/spinner/Spinner';
import {useDispatch} from 'react-redux';
import {login} from '../../main/bll/auth-actions';

const Login: FC<any> = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState<string>('nya-admin@nya.nya')
  const [password, setPassword] = useState<string>('1qazxcvBG')
  const [validEmail, setValidEmail] = useState<boolean>(false)
  const [validPassword, setValidPassword] = useState<boolean>(false)
  const [checkedInput, setCheckedInput] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAuth, setIsAuth] = useState<boolean>(false)

  const setRememberMe = (checked: boolean) => {
    setCheckedInput(checked)
  }


  const changeEmail = ({target}: ChangeEvent<HTMLInputElement>) => {
    setValidEmail(false)
    setEmail(target.value)
  }

  const changePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setValidPassword(false)
    setPassword(e.target.value)
  }
  const setIsValid = () => {
    const pattern = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
    if (!pattern.test(email)) {
      setValidEmail(true)
    }
    if (password.length < 6) {
      setValidPassword(true)
    }
  }

  const onSubmit = () => {
    if (!validEmail && !validPassword) {
      // setIsLoading(true)
      // диспатчим санку с запросом
      dispatch(login({email: email, password: password, rememberMe: checkedInput}))
      //если ты авторизован то редирект на главную страницу
      setIsAuth(true)
    }
  }
  if (isAuth) {
    // setIsLoading(true)
    return <Redirect to={PATH.PROFILE}/>
  }
  return (
      <section className="login">
        <div className="login__container">
          {isLoading ? (<Spinner/>)
              : (<>
                    <div>
                      <h2>Login</h2>
                      Email
                      <Input type={'email'} value={email} onChange={changeEmail}/>
                      Password
                      <Input type={'password'} value={password} onChange={changePassword}/>
                    </div>
                    <Link to={PATH.SIGNUP}>Sign Up (Registration)</Link>
                    <Checkbox onChangeChecked={setRememberMe}>Remember me!</Checkbox>
                    <button onClick={onSubmit} onMouseDown={setIsValid}>Submit</button>
                  </>
              )}
          {validEmail && <p className="error">Enter valid email</p>}
          {validPassword && <p className="error">Enter longer password more then 6 symbols Now: {password.length}</p>}

        </div>
      </section>
  )
};

export default Login;
