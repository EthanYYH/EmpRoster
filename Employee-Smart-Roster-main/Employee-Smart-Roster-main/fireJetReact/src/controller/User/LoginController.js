import axios from "axios"
import { API_URL } from "../../dbURL";

function ValidateLoginValues (values){
    let error = {}
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/

    // Email value validation
    if(values.email === '')
        error.email = "Email should not be empty"

    else if(!email_pattern.test(values.email))
        error.email = "Invalid email format"

    else
        error.email = ""

    // Password value validation
    if(values.password === '')
        error.password = "Password should not be empty"

    else if(!password_pattern.test(values.password))
        error.password = "Invalid password"

    else
        error.password = ""

    return error;
}

export const SubmitLogin = async (values) => {
    try {
        const response = await axios.post(`${API_URL}`, values);
        console.log(response)
        return response.data;   // Return backend response
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export default {
    ValidateLoginValues,
    SubmitLogin
}