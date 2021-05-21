import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Profile from '../../../features/profile/Profile';
import RecoveryPass from '../../../features/recoveryPass/RecoveryPass';
import Error404 from '../error-404/Error404';
import TestPage from '../../../components/TestPage';
import Login from '../../../features/login/Login';
import SignUp from '../../../features/signUp/SignUp';
import Header from '../header/Header';
import {Packs} from '../../../features/packs/packs';
import SetNewPassword from '../../../features/setNewPassword/SetNewPassword';
import {useSelector} from 'react-redux';
import {RootStoreType} from '../../bll/store';
import {AuthStateType} from '../../bll/auth/authReducer';
import {Search} from '../../../features/search/Search';


export const PATH = {
  PROFILE: '/profile',
  LOGIN: '/login',
  RECOVERY: '/recovery',
  SIGNUP: '/signUp',
  TEST_PAGE: '/testPage',
  SET_NEW_PASSWORD: '/SetNewPassword',
  PACKS: '/packs',
  SEARCH: '/search'
}

const Routes = () => {
  const {isAuth} = useSelector<RootStoreType,AuthStateType>(state => state.user)
  return (
      <div>
        {isAuth && <Header/>}
        <Switch>
          <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>
          <Route path={PATH.PACKS} render={() => <Packs/>}/>
          <Route path={PATH.LOGIN} render={() => <Login/>}/>
          <Route path={PATH.SIGNUP} render={() => <SignUp/>}/>
          <Route path={PATH.PROFILE} render={() => <Profile/>}/>
          <Route path={PATH.TEST_PAGE} render={() => <TestPage/>}/>
          <Route path={PATH.RECOVERY} render={() => <RecoveryPass/>}/>
          <Route path={`${PATH.SET_NEW_PASSWORD}/:token`} render={() => <SetNewPassword/>}/>
          <Route path={PATH.SEARCH} render={() => <Search/>}/>
          <Route render={() => <Error404/>}/>
        </Switch>
      </div>
  );
}

export default Routes;
