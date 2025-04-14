import path from 'path';
import { EMAIL_PATTERN, encodeFileContent } from '../Variables.js'
import { BiDizzy } from 'react-icons/bi';
// var path = require('path')

function validateEmail (email){
    // Email value validation
    if(!EMAIL_PATTERN.test(email))
        return "Invalid email format"
    else
        return ""
}

async function createRegisRequest (bizFile, email, UEN, bizName, password){
    console.log("BizFile: ", bizFile)
    try{
        const fileName = bizFile.name;
        const fileType = bizFile.type || 'application/pdf';
        const convertFileToBase64 = await encodeFileContent(bizFile);

        const body = {
            fileName,
            fileType,
            fileData: convertFileToBase64,
            email,
            UEN,
            bizName, 
            password
        };
    
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/s3/guest/register', {
            method: 'POST',
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
        throw new Error(`Registration Failed: ${error.message}`);
    }
}

export default {
    validateEmail,
    createRegisRequest,
}