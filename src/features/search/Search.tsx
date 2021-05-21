import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getDecks} from '../../main/bll/decks/decks-thunk';
import {Redirect} from 'react-router-dom';
import {PATH} from '../../main/ui/routes/Routes';
import {RootStoreType} from '../../main/bll/store';
import {AuthStateType} from '../../main/bll/auth/authReducer';
import {useFormik} from 'formik';
import {DecksStateType} from '../../main/bll/decks/decks-types';
import {setNewParams} from '../../main/bll/decks/decks-action';

export const Search = () => {
    const {isAuth} = useSelector<RootStoreType, AuthStateType>((state) => state.user)
    const {listOfDecks, params} = useSelector<RootStoreType, DecksStateType>((state) => state.decks)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getDecks())
    }, [params])

    const formik = useFormik({
        initialValues: {packName: ''},
        onSubmit: (values, action) => {
            console.log(values)
            dispatch(setNewParams({...params, packName: values.packName.trim()}))
            action.resetForm()
        }
    })


    if (!isAuth ) {
        return <Redirect to={PATH.LOGIN}/>
    }

    return (
        <div>
            <h2>Search page</h2>
            <form onSubmit={formik.handleSubmit} action="">
                <input {...formik.getFieldProps('packName')}/>
                <button type='submit'>Search</button>
            </form>
            <div>
                {
                    listOfDecks.map(el => {
                        return <div>{el.name}</div>
                    })
                }
            </div>
        </div>
    );
};