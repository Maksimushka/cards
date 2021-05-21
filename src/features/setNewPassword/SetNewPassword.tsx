import React, { useState } from 'react';
import './SetNewPossword.scss'
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {useDispatch} from 'react-redux';
import {setNewPassword} from '../../main/bll/auth/auth-actions';
import { useParams } from 'react-router-dom';

const SetNewPassword = () => {

    const [triedToSubmit, setTriedToSubmit] = useState(false)
    const dispatch = useDispatch()
    const {token} = useParams<{token: string}>();

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPass: ''
        },
        validationSchema: Yup.object({
            password: Yup.string().min(8, 'Password must be 8 characters or more').required('Required'),
            confirmPass: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required('Required')
        }),
        onSubmit: values => {
            const newPass = {password: values.password, resetPasswordToken: token}
            dispatch(setNewPassword(newPass))
            formik.resetForm()
        }
    })

    return (
        <div className='setNewPasswordBlock'>
            <h2>Set new password</h2>
            <div className='setNewPasswordBlock__form'>
                <form onSubmit={formik.handleSubmit}>
                    <label htmlFor='password'>Enter password</label>
                    <Input type={'password'} {...formik.getFieldProps('password')} />
                    {triedToSubmit && formik.touched.password && formik.errors.password
                    && <div style={{color: 'red'}}>{formik.errors.password}</div>}

                    <label htmlFor='confirmPass'>Confirm password</label>
                    <Input type={'password'} {...formik.getFieldProps('confirmPass')} />
                    {triedToSubmit && formik.touched.confirmPass && formik.errors.confirmPass
                    && <div style={{color: 'red'}} >{formik.errors.confirmPass}</div>}

                    <Button onClick={() => setTriedToSubmit(true)} type={'submit'}>Submit</Button>
                </form>
            </div>
        </div>
    );
};

export default SetNewPassword;