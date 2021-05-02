import React from 'react';
import Input from '../../components/input/Input';

const RecoveryPass = () => {
    return (
        <div>
            <h2>Recovery password</h2>
            <label htmlFor='recov'>Enter your email:</label>
            <Input id='recov'/>
        </div>
    );
};

export default RecoveryPass;