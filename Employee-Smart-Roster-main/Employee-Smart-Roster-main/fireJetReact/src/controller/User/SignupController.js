import axios from "axios"
import { EMAIL_PATTERN, PW_PATTERN } from '../Variables.js'

function ValidateSignupValues (email, password, confirm_password){
    let error = {}

    // Email value validation
    if(!EMAIL_PATTERN.test(email))
        error.email = "Invalid email format"
    else
        error.email = ""

    // Password value validation
    if(!PW_PATTERN.test(password))
        error.password = "Invalid password format"
    else
        error.password = ""

    // Confirm password value validation
    if(confirm_password !== password)
        error.confirm_password = "Confirm password doesn't match with password"
    else
        error.confirm_password = ""

    return error;
}


export default {
    ValidateSignupValues,
}