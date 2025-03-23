import axios from "axios"
import { API_URL } from "../dbURL";

export function ValidateSignupValues (values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
    const passwordStr = Array.isArray(values.password) ? values.password[0] : values.password
    const confirmPwStr = Array.isArray(values.confirm_password) ? values.confirm_password[0] : values.confirm_password

    // Email value validation
    if(values.email === '')
        error.email = "Email should not be empty"

    else if(!email_pattern.test(values.email))
        error.email = "Invalid email format"

    else
        error.email = ""

    // Password value validation
    if(passwordStr === '')
        error.password = "Password should not be empty"

    else if(!password_pattern.test(passwordStr))
        error.password = "Invalid password"

    else
        error.password = ""

    // Confirm password value validation
    if(confirmPwStr === '')
        error.confirm_password = "Confirm password should not be empty"

    else if(confirmPwStr !== passwordStr)
        error.confirm_password = "Confirm password doesn't match with password"

    else
        error.password = ""

    return error;
}

export const SubmitRegRequest = async (values) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, values);
        return response.data;   // Return backend response
    } catch (error) {
        console.error("Registration error:", error);
        throw error;
    }
};