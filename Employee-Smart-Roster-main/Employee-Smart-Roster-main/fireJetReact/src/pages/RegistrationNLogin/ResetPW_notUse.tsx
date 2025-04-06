import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import OtpInput from './OtpInput';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
// import ResetPwController from '../../controller/User/ResetPwController.js';

import './style.css'
import '../../../public/styles/common.css'

// import function needed from ResetPwController
// const { sendOTP, } = ResetPwController;

const ResetPassword: React.FC = () => {
    const { token } = useParams();
    const [ newPassword, setNewPassword ] = useState<string>('');
    const [ confirmNewPw, setConfirmNewPw ] = useState<string>('');
    // const [ otp, setOtp ] = useState<string>('');
    // const [ resendOtpTimer, setResendOtpTimer ] = useState(120);
    // const [ disableResendOtp, setDisableResendOtp ] = useState(true);

    // const triggerOtpChange = (value: string) => {
    //     setOtp(value)
    // }

    // Count down function for resend otp
    // Auto trigger when the disableResendOtp || resendOtpTimer changed
    // useEffect(() => {
    //     let timer: NodeJS.Timeout;

    //     if (disableResendOtp && resendOtpTimer >= 0) {
    //         timer = setInterval(() => {
    //             setResendOtpTimer(prev => {
    //                 // If prev time is 0
    //                 if(prev === 0){
    //                     setDisableResendOtp(false); // Enable Resend Email button
    //                     clearInterval(timer);
    //                     return 0;
    //                 }
    //                 return prev - 1
    //             })
    //         }, 1000)
    //     }
    //     // console.log(resendOtpTimer)
    //     return () => clearInterval(timer) // Clean Up
    // }, [disableResendOtp, resendOtpTimer])

    return (
        <div className="reset-pw">
            <Header />
            <form action="">
                {/* Request User Input OTP */}
                {/* <div className='forms-input OTP-form-input'>
                    <strong>
                        OTP Sent to Your Email <span style={{ color: 'red' }}>*</span>
                    </strong>
                    <div className="fields">
                        <OtpInput 
                            value={otp} 
                            valueLength={6} 
                            onChange={triggerOtpChange} />
                    </div>
                </div> */}
                
                {/* Request User Input New Password */}
                <div className='forms-input'>
                    <strong>
                        New Password <span style={{ color: 'red' }}>*</span>
                    </strong>
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
                    {/* <div className="reset-pw-resend-otp">
                        <span>Didn't receive code? </span>
                        {disableResendOtp ? (
                            <span>
                                &nbsp;Resend in {resendOtpTimer}s
                            </span>
                        ):(
                            <SecondaryButton 
                                text='Resend OTP'
                                // onClick={}    
                            />
                        )}
                    </div> */}
                </div>
                
                
            </form>
        </div>
    )
}

export default ResetPassword;