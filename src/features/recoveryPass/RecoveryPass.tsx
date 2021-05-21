import React, {useState} from 'react';
import Input from '../../components/input/Input';
import './RecoveryPass.scss'
import Button from '../../components/button/Button';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {setRecovery} from '../../main/bll/auth/auth-actions';

const RecoveryPass = () => {

    const [triedToSubmit, setTriedToSubmit] = useState(false)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: { email: '' },
        validationSchema: Yup.object({ email: Yup.string().email('Invalid email').required('Required') }),
        onSubmit: values => {
            dispatch(setRecovery(values.email))
            formik.resetForm()
        }
    })

    return (
        <div className='RecoveryPassBlock'>
            <h2>Recovery password</h2>
            <div className='RecoveryPassBlock__form'>
                <form onSubmit={formik.handleSubmit} action="">
                    <label htmlFor='email'>Enter your email:</label>
                    <Input required type={'email'} {...formik.getFieldProps('email')} />

                    {triedToSubmit && formik.touched.email && formik.errors.email
                    && <div style={{color: 'red'}}>{formik.errors.email}</div>}

                    <Button onClick={() => setTriedToSubmit(true)} type='submit'>Send</Button>
                </form>
                <p className='RecoveryPassBlock__text'>* We will send you an email with further instructions on password recovery</p>
            </div>
        </div>
    );
};

export default RecoveryPass;