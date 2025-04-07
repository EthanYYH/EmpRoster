import { EMAIL_PATTERN, PW_PATTERN } from "../Variables.js";

function validateEmail(email) {
    if(!EMAIL_PATTERN.test(email))
        return "Invalid Email Format Found"
    else
        return ""
}

async function handleSendResetPwUR(email){
    // Trigger check user email and send url API here

    // return response code
}

// Function to check if current email is registered
async function checkIfEmailRegistered(email){
    // const body = {

    // };

    // try{
    //     const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/systemadmin/registrationrequest/view', {
    //         method: 'GET',
    //         body: JSON.stringify(),
    //         headers: { 'Content-Type': 'application/json' }
    //     });
    //     if(!response.ok) {
    //         const errorData = await response.json();
    //         throw new Error(errorData.message || `HTTP error status: ${response.status}`);
    //     }
    //     const data = await response.json();
    //     // console.log(data);

    //     return await data;
    // } catch(error) {
    //     console.error(`Network error for UID ${uid}: \n`, error);
    //     throw new Error(`Failed to fetch company data: ${error.message}`);
    // }
    return true;
}

async function handleResetPassword(email, password){
    const body = {
        email: email,
        password: password
    };

    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/account/change-password', {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);

        return await data;
    } catch(error) {
        console.error(`Network error for UID ${uid}: \n`, error);
        throw new Error(`Failed to fetch company data: ${error.message}`);
    }
}

function validateNewPassword(newPw) {
    // Password value validation
    if(!PW_PATTERN.test(newPw))
        return "Invalid password format"
    else
        return ""
}

function validateConfirmNewPassword(newPw, confirmeNewPw) {
    // Confirm password value validation
    if(confirmeNewPw !== newPw)
        return "Confirm password doesn't match with password"
    else
        return ""
}

export default {
    validateEmail,
    handleSendResetPwUR,
    checkIfEmailRegistered,
    handleResetPassword,
    validateNewPassword,
    validateConfirmNewPassword,
}