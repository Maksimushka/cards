import React, { useState } from 'react';
import './SetNewPossword.scss'
import Input from '../../components/input/Input';
import Button from '../../components/button/Button';
import {useFormik} from 'formik';
import * as Yup from 'yup'

const SetNewPassword = () => {

    const [triedToSubmit, setTriedToSubmit] = useState(false)

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPass: ''
        },
        validationSchema: Yup.object({
            password: Yup.string().min(6, 'Password must be 6 characters or more').required('Required'),
            confirmPass: Yup.string().oneOf([Yup.ref("password")], "Passwords must match").required('Required')
        }),
        onSubmit: values => {
            alert(JSON.stringify(values))
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