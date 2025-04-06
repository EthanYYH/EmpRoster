import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAlert } from '../../components/PromptAlert/AlertContext';
import Header from './Header';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import PasswordController from '../../controller/User/PasswordController.js';

import './style.css'

const { validateEmail, handleSendResetPwURL, } = PasswordController;

export default function ReqResetEmail() {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [ email, setEmail ] = useState<string>('');
    const [ error, setError ] = useState<string>('');

    const triggerValidateEmail = async(value: string) => {
        setEmail(value)
        setError(validateEmail(email));
    }

    const triggerRecoverPw = async() => {
        if(!email) return; // If email is empty, break the function
        if(error) return; // If error found, break the function
        
        try {
            // setError(validateEmail(email));

            // Call handleSendResetPwURL(email) to get response code returned
            const response = 200

            // Set Alert base on response returned
            if(response === 200){ // Success
                showAlert(
                    'Reset Password URL Sent To',
                    `${email}`,
                    'Please check in your inbox',
                    { type: 'info' }
                );
            } else if(response === 404){
                showAlert(
                    'Reset Password URL Failed To Send',
                    `${email}`,
                    'Email not registered',
                    { type: 'error' }
                );   
            } else if(response === 500){
                showAlert(
                    'Reset Password URL Failed To Send',
                    `${email}`,
                    'Sever Error',
                    { type: 'error' }
                );
            }
        } catch(error) {
            showAlert(
                'Recover Password Failed',
                '',
                'EmpRoster Failed to Contact with Server',
                { type: 'error' }
            )
        }
    }

    function triggerLogIn () {
        navigate('/login');
    }

    return(
        <div className="request-input-email-for-reset">
            <Header />
            <div className='form'>
                <div className='forms-input'>
                    <strong>
                        Email <span style={{ color: 'red' }}>*</span>
                    </strong>
                    <div className="fields">
                        <input type='email' 
                            name='email'
                            placeholder='Enter Registered Email' 
                            onChange={(e) => triggerValidateEmail(e.target.value)}
                            required
                        />
                        {error && <span className='error-message'>
                            {error}
                        </span>}
                    </div>
                </div>

                <div className="register-btns-grp">
                    <PrimaryButton 
                        text='Recover Password'
                        onClick={triggerRecoverPw} 
                    />
                    <div className="register-log-in">
                        <span>Go back to</span>
                        <SecondaryButton 
                            text="Sign In"
                            onClick={triggerLogIn}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}