import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Profile from '../../../features/profile/Profile';
import RecoveryPass from '../../../features/recoveryPass/RecoveryPass';
import Error404 from '../error-404/Error404';
import TestPage from '../../../components/TestPage';

export const PATH = {
    PROFILE: "/profile",
    LOGIN: '/login',
    RECOVERY: '/recovery',
    SIGNUP: "/signUp",
    TESTPAGE: '/testPage'
}

function Routes() {
    return (
        <div>
            <Switch>
                <Route path={"/"} exact render={() => <Redirect to={PATH.PROFILE}/>}/>

                <Route path={PATH.PROFILE} render={() => <Profile />}/>
                <Route path={PATH.LOGIN} render={() => <Profile />}/>
                <Route path={PATH.SIGNUP} render={() => <Profile />}/>
                <Route path={PATH.RECOVERY} render={() => <RecoveryPass />}/>
                <Route path={PATH.TESTPAGE} render={() => <TestPage />}/>

                <Route render={() => <Error404 />}/>
            </Switch>
        </div>
    );
}

export default Routes;