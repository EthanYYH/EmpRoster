import axios from "axios";
import { useAuth } from "../AuthContext.js";
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import PrimaryButton from "./PrimaryButton/PrimaryButton";
import SecondaryButton from "./SecondaryButton/SecondaryButton";
import LoginController from '../controller/User/LoginController';
import "./Login.css";
import "../../public/styles/common.css";

// Access the function from the default export within ValidationController
const { ValidateLoginValues, SubmitLogin } = LoginController;

export default function Login({ className = "" }: LoginProps) {
  
  const [values, setValues] = useState({
    email: '',
    password:''
  })
  const navigate = useNavigate(); 
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const { login } = useAuth();

  // Set inputs values
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({
      ...prev,
      [event.target.name]: event.target.value
    }))
  }

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validationErrors = ValidateLoginValues(values);
      setErrors(validationErrors);
      console.log("values");
      console.log(values);
      
      //if(Object.values(validationErrors).every(error => error === "")) {
        if(true) {
        try{
          
            const data = await SubmitLogin(values);
            console.log("response");
            console.log(data);
            if (data.responseCode === 200) {
              console.log('Login successful:', data);
              login(data);
              if (data.role === "System Admin") {
                
                navigate('/admin-dashboard');
              }
              else if (data.role === "Business Owner") {
                navigate('/business-dashboard');
              }
              else if (data.role === "Employee") {
                navigate('/employee-dashboard');
              } 
          } else {
              throw new Error('Login failed');
          }
          } catch (err) {
            console.error("Error during login:", err); 
          // Handle non-Axios errors
          alert("An unexpected error occurred. Please try again.");
          }
        }
      }

  

  return (
    <div className={"login-login"}>
      <div className="login-welcome-to-emproster">
        <span>
          <p className="login-para">Welcome to</p>
          <p className="login-para-1">EmpRoster</p>
        </span>
      </div>

      <form action='' onSubmit={handleLogin}>
        <strong>
          Email<span style={{ color: 'red' }}>*</span>
        </strong>
        <div className="fields">
          <input type='email' 
            name='email'
            value={values.email}
            placeholder='Enter Email' 
            onChange={handleInput}
          />
          {errors.email && <span className='error'>
            {errors.email}
          </span>}
        </div>
        <div className="login-t-label">
          <strong>
            Password<span style={{ color: 'red' }}>*</span>
          </strong>
        </div>
        <div className="fields">
          <input type='password' 
              name='password'
              placeholder='Enter Password' 
              onChange={handleInput}
          />
        </div>
        <div className="login-button-group">
          <button type="submit">
            <PrimaryButton text="Sign In" />
          </button>
          <button>
            <SecondaryButton text="Forgot password?"/>
          </button>
        </div>
      </form>
    </div>
  );
}

interface LoginProps {
  className?: string;
}
