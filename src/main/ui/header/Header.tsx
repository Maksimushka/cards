import React from 'react';
import {NavLink} from 'react-router-dom';
import {PATH} from '../routes/Routes';
import './Header.scss'
import {useDispatch} from 'react-redux';
import {setLogOut} from '../../bll/auth/auth-actions';

const Header = () => {
  const dispatch = useDispatch()
    const navBarItems = [
        {title: 'Profile', link: PATH.PROFILE},
        {title: 'TestPage', link: PATH.TEST_PAGE},
        {title: 'Recovery', link: PATH.RECOVERY},
        {title: 'Packs', link: PATH.PACKS},
        {title: 'Search', link: PATH.SEARCH},
        // {title: 'Sign up', link: PATH.SIGNUP},
        // {title: 'Login', link: PATH.LOGIN},
    ]
    return (
        <div className='headerBlock'>
            <div className='headerBlock__navBar'>
                {
                    navBarItems.map(el => {
                        return <NavLink key={el.link} activeClassName='headerBlock__navBar-active' className='headerBlock__navBar-item' to={el.link}>{el.title}</NavLink>
                    })
                }
              <NavLink to={PATH.LOGIN} className='headerBlock__navBar-item' onClick={()=>dispatch(setLogOut())}>Log out</NavLink>
            </div>
        </div>
    );
};

export default Header;
