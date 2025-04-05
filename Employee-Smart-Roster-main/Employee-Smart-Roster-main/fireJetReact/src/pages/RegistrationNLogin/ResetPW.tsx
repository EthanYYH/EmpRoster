import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaInfoCircle } from '../../../public/Icons.js'
import Header from './Header';
import PwRule from './PwRule';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';

import './style.css'
import '../../../public/styles/common.css'

const ResetPassword: React.FC = () => {
    const token = useParams(); // SubString the token to URL link for token
    const [ newPassword, setNewPassword ] = useState<string>('');
    const [ confirmNewPw, setConfirmNewPw ] = useState<string>('');
    const [ showPwRule, setShowPwRule ] = useState(false);

    function triggerDisplayPwRule() {
        setShowPwRule(true);
    }

    function triggerInvisiblePwRule() {
        setShowPwRule(false);
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
                            <span className='reset-pw-rule-tooltext'>
                                <PwRule />
                            </span>
                        </div>
                        
                        {showPwRule && (
                            <div className="pw-rule-tooltip-box">
                                Test password rule
                                <PwRule />
                            </div>
                        )}
                    </div>
                    
                    <div className="fields">
                        <input type='password' 
                            name='password'
                            placeholder='Enter New Password' 
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        {/* {errors.password && <span className='error-message'>
                            {errors.password}
                        </span>} */}
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
                            onChange={(e) => setConfirmNewPw(e.target.value)}
                            required
                        />
                        {/* {errors.password && <span className='error-message'>
                            {errors.password}
                        </span>} */}
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