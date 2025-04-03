// https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/company/employee/add
// "business_owner_id: 2,
//         user_id: 4,
//         email: ""employee2new@example.com"",
//         hpNo: 90002222,
//         resStatusPassType: ""Work Permit"",
//         jobTitle: ""Manager of the beaunite group"",
//         roles: ""Developer"",
//         standardWrkHrs: 5,
//         skillsets: ""Java"",
//         noOfLeave: 5,
//         noOfLeaveAvailable: 5,
//         noOfMC: 4,
//         noOfMCAvailable: 4,
//         startWorkTime: ""10:00:00"",
//         endWorkTime: ""11:00:00"",
//         daysOfWork: 6,
//         activeOrInactive: 1"
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
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/company/employee/add', {
            method: 'POST',
            body: JSON.stringify(values),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const data = await response.json();  // Parse JSON response here
            return data;  // Return the parsed data
        } else {
            throw new Error(`Login failed with status ${response.status}`);
        }
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export default {
    ValidateLoginValues,
    SubmitLogin
}