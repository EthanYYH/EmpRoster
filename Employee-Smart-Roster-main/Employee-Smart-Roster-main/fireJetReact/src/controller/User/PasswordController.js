function validateEmail(email) {
    let error = ""
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s]+$/

    if(!email_pattern.test(email))
        error = "Invalid Email Format Found"

    return error;
}

export const handleSendResetPwURL = async (email) => {
    // Trigger check user email and send url API here

    // return response code
}

export default {
    validateEmail,
    handleSendResetPwURL,
}