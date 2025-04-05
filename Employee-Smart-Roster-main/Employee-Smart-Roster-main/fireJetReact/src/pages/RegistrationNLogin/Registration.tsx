import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAlert } from '../../components/PromptAlert/AlertContext'
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton'
import SecondaryButton from '../../components/SecondaryButton/SecondaryButton';
import Header from "./Header";
import './style.css'
import '../../../public/styles/common.css'


const Register = () => {
    const { showAlert } = useAlert();
    const navigate = useNavigate(); 
    const [ email, setEmail ] = useState<string>('');
    const [ UEN, setUEN ] = useState<string>('');
    const [ bizName, setBizName ] = useState<string>('');
    const [ bizFile, setBizFile ] = useState<File | null>(null);
    const [ fileStatus, setFileStatus ] = useState<
        'initial' | 'uploading' | 'success' | 'fail'
    >('initial');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileStatus('initial');
            setBizFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async () => {
        if (bizFile) {
          setFileStatus('uploading');
    
          const formData = new FormData();
          formData.append('bizFile', bizFile);
    
          try {
            // const result = await fetch('https://httpbin.org/post', {
            //   method: 'POST',
            //   body: formData,
            // });
    
            // const data = await result.json();
            
            // console.log(data);
            console.log(formData);

            setFileStatus('success');
          } catch (error) {
            setFileStatus('fail');
            showAlert(
                'BizFile failed upload: ',
                '',
                {error}.toString(),
                { type: 'error' }
            )
          }
        }
    };

    function triggerLogIn() {
        navigate('/login')
    }

    return (
        <div className="register">
            <Header />
            <form action="">
                {/* Company Email */}
                <div className='forms-input'>
                    <strong>
                        Company Email <span style={{ color: 'red' }}>*</span>
                    </strong>
                    <div className="fields">
                        <input type='email' 
                            name='email'
                            value={email}
                            placeholder='Enter Company Email' 
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {/* {errors.email && <span className='error'>
                            {errors.email}
                        </span>} */}
                    </div>
                </div>
                

                {/* UEN */}
                <div className='forms-input'>
                    <strong>
                        Company UEN <span style={{ color: 'red' }}>*</span>
                    </strong>
                    <div className="fields">
                        <input type='text' 
                            name='UEN'
                            value={UEN}
                            placeholder='Enter Company UEN' 
                            onChange={(e) => setUEN(e.target.value)}
                            required
                        />
                        {/* {errors.email && <span className='error'>
                            {errors.email}
                        </span>} */}
                    </div>
                </div>
                

                {/* BizName */}
                <div className='forms-input'>
                    <strong>
                        Company Name <span style={{ color: 'red' }}>*</span>
                    </strong>
                    <div className="fields">
                        <input type='text' 
                            name='bizName'
                            value={bizName}
                            placeholder='Enter Company Name' 
                            onChange={(e) => setBizName(e.target.value)}
                            required
                        />
                        {/* {errors.email && <span className='error'>
                            {errors.email}
                        </span>} */}
                    </div>
                </div>
                

                {/* BizFile */}
                <div className='forms-input'>
                    <strong>
                        Upload BizFile <span style={{ color: 'red' }}>*</span>
                    </strong>
                    <div className="fields">
                        <input type='file' 
                            name='bizFile'
                            accept=".pdf"
                            onChange={handleFileChange}
                            required
                        />
                        {/* {errors.email && <span className='error'>
                            {errors.email}
                        </span>} */}
                    </div>
                </div>
                
                <div className="register-btns-grp">
                    <PrimaryButton 
                        text='Register'
                        onClick={handleFileUpload} 
                    />
                    <div className="register-log-in">
                        <span>Already had an account? </span>
                        <SecondaryButton 
                            text="Sign In"
                            onClick={triggerLogIn}
                        />
                    </div>
                </div>
                
            </form>
        </div>
    )
}

export default Register
