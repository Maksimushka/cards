import React, {useEffect} from 'react';
import './profile.scss'
import {useDispatch, useSelector} from "react-redux";
import {RootStoreType} from "../../main/bll/store";
import {setLogOut, setMeTC} from "../../main/bll/auth-actions";
import {Redirect} from "react-router-dom";
import {PATH} from "../../main/ui/routes/Routes";
import {AuthStateType} from '../../main/bll/authReducer';


const Profile = () => {
    const dispatch = useDispatch()
    const {isAuth, avatar, name} = useSelector<RootStoreType, AuthStateType>((state) => state.user)

    useEffect(() => {
      dispatch(setMeTC())
    }, [dispatch,isAuth])

    const isAuthLogUot = () => {
        dispatch(setLogOut())
    }

    if (!isAuth ) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            <div className='description'>
                <div>
                    <img src={avatar ? avatar : ''} alt="userPhoto"/>
                </div>
                <div className='name'>{name}</div>
            </div>
            <button className="logOut"
                    onClick={isAuthLogUot}
            >LogOut
            </button>
        </div>
    );
};

export default Profile;
