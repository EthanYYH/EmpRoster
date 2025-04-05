import { EMAIL_PATTERN, PW_PATTERN } from "./Variables";

function validateEmail(email) {
    let error = ""

    if(!EMAIL_PATTERN.test(email))
        error = "Invalid Email Format Found"

    return error;
}

const handleSendResetPwURL = async (email) => {
    // Trigger check user email and send url API here

    // return response code
}

function validateNewPassword(newPw) {
    let error = ''

    if(!PW_PATTERN.test(newPw))
        error = 'Invalid password'

    return error;
}

function validateConfirmNewPassword(newPw, confirmeNewPw) {
    let error = ''

    if(newPw !== confirmeNewPw)
        error = 'The Confirm New Password does not match'

    return error;
}

export default {
    validateEmail,
    handleSendResetPwURL,
    validateNewPassword,
    validateConfirmNewPassword,
}