import { EMAIL_PATTERN } from '../Variables.js'

function validateEmail (email){
    // Email value validation
    if(!EMAIL_PATTERN.test(email))
        return "Invalid email format"
    else
        return ""
}

async function createRegisRequest (){
    const body = {
        registrationID: registrationID,
        status: status,
        reasonOfReject:reasonOfReject,
    };

    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/s3/guest/register', {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);

        return await data;
    } catch(error) {
        console.error(`Network error for UID ${uid}: \n`, error);
        throw new Error(`Failed to fetch company data: ${error.message}`);
    }
}


export default {
    validateEmail,
    createRegisRequest,
}