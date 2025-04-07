import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaInfoCircle } from '../../../public/Icons.js'
import PasswordController from '../../controller/User/PasswordController.js';
import Header from './Header';
import PwRule from './PwRule';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

import './style.css'
import '../../../public/styles/common.css'

const { handleResetPassword, 
        validateConfirmNewPassword,
        validateNewPassword, } = PasswordController

const ResetPassword: React.FC = () => {
    const token = useParams(); // SubString the token to URL link for token
    const [ newPassword, setNewPassword ] = useState<string>('');
    const [ confirmNewPw, setConfirmNewPw ] = useState<string>('');
    const [ showPwRule, setShowPwRule ] = useState(false);
    const [ errors, setErrors ] = useState<{ 
        password?: string; 
        confirm_password?:string;
    }>({})

    function triggerDisplayPwRule() {
        setShowPwRule(true);
    }

    function triggerInvisiblePwRule() {
        setShowPwRule(false);
    }

    const triggerPwValidation = async(value:string) => {
        setNewPassword(value);
        const error = validateNewPassword(newPassword);
        errors.password = error;
    }

    const triggerConfirmPwValidation = async(value:string) => {
        setConfirmNewPw(value);
        const error = validateConfirmNewPassword(newPassword, confirmNewPw)
        errors.confirm_password = error;
    }

    return (
        <div className="reset-pw">
            <Header />
            <form action="">
                
                {/* Request User Input New Password */}
                <div className='forms-input'>
                    <div className="reset-pw-information">
                        <strong>
                            New Password 
                            <span style={{ color: 'red' }}>*</span>
                        </strong>
                        <div className="reset-pw-info-tooltip-icon">
                            <FaInfoCircle 
                                className='reset-pw-rule-info-icon'
                            />
                        </div>
                        
                        {showPwRule && (
                            <div className="pw-rule-content">
                                <PwRule />
                            </div>
                        )}
                    </div>
                    
                    <div className="fields">
                        <input type='password' 
                            name='password'
                            placeholder='Enter New Password' 
                            onChange={(e) => triggerPwValidation(e.target.value)}
                            required
                        />
                        {errors.password && 
                            <span className='error-message'>
                                {errors.password}
                            </span>
                        }
                    </div>
                </div>

                {/* Request User Input Confirmed New Password */}
                <div className='forms-input'>
                    <strong>
                        Confirm New Password <span style={{ color: 'red' }}>*</span>
                    </strong>
                    <div className="fields">
                        <input type='password' 
                            name='password'
                            placeholder='Enter Confirm New Password' 
                            onChange={(e) => triggerConfirmPwValidation(e.target.value)}
                            required
                        />
                        {errors.confirm_password && 
                            <span className='error-message'>
                                {errors.confirm_password}
                            </span>
                        }
                    </div>
                </div>

                <div className="reset-pw-btn">
                    <PrimaryButton 
                        text='Reset Password'
                        // onClick={() => }
                    />
                </div>
                
                
            </form>
        </div>
    )
}

export default ResetPassword;