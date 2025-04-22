import { COMPANY_PHONE_PATTERN } from "./Variables.js";

async function getCompany (uid){
    const body = {
        UID: uid,
    }
    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/company/profile', {
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
    } catch (error) {
        console.error(`Network error for UID ${uid}: \n`, error);
        throw new Error(`Failed to fetch company data: ${error.message}`);
    }
}


async function getCompanyBizFile (email){
    const body = {
        email: email,
    }
    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/s3/owner/downloadpdf', {

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
    } catch (error) {
        console.error(`Network error for fetch company's BizFile: \n`, error);
        throw new Error(`Failed to fetch company's BizFile: ${error.message}`);
    }
}

function GetCompanyRoles (){
    const data = [
        {
            uen: "202017097M",
            role: "Programmer",
        },
        {
            uen: "202017097M",
            role: "Database Designer",
        },
        {
            uen: "202017097M",
            role: "UI Designer",
        },
        {
            uen: "53342345K",
            role: "Project Manager",
        },
        {
            uen: "53342345K",
            role: "Financial",
        },
    ]
    return data;
}

function GetCompanySkillsets (){
    const data = [
        {
            uen: "202017097M",
            skill: "React",
        },
        {
            uen: "202017097M",
            skill: "Figma",
        },
        {
            uen: "202017097M",
            skill: "Draw.io",
        },
        {
            uen: "53342345K",
            skill: "Microsoft Project",
        },
        {
            uen: "53342345K",
            skill: "Visual Studio",
        },
    ]
    return data;
}

async function getCompanyRoles (boID){
    // console.log(boID)
    const body = {
        business_owner_id: boID,
    }
    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/company/role/view', {
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
    } catch (error) {
        // console.error(`Network error for UID ${uid}: \n`, error);
        throw new Error(`Failed to fetch company data: ${error.message}`);
    }
}

async function getCompanySkillsets (boID){
    const body = {
        business_owner_id: boID,
    }
    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/company/skillset/view', {
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
    } catch (error) {
        // console.error(`Network error for UID ${uid}: \n`, error);
        throw new Error(`Failed to fetch company data: ${error.message}`);
    }
}

async function getBOUserProfile(boID) {
    const body = {
        business_owner_id: boID,
    }
    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/profile/view', {
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
    } catch (error) {
        // console.error(`Network error for UID ${uid}: \n`, error);
        throw new Error(`Failed to fetch user data: ${error.message}`);
    }
}

async function setBOCompleteProfile(boID, cContact, address, nric, hpNo, name) {
    // Remove all non-digit characters
    cContact = cContact.replace(/\D/g, '').slice(0, 8);
    hpNo = hpNo.replace(/\D/g, '').slice(0, 8);
    
    const body = {
        business_owner_id: boID,
        BusinessContactNo: cContact,
        address: address,
        hpNo: hpNo,
        fullName: name,
        nric: nric
    }
    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/firstlogin', {
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
    } catch (error) {
        // console.error(`Network error for UID ${name}: \n`, error);
        throw new Error(`Failed to complete user profile: ${error.message}`);
    }
}

const handleSelectedDetail = (selectedCompany) => {
    return selectedCompany;
}

function handleFilterUENBizName(companies, filterString){
    const filteredData = companies.filter((company) => {
        const search = filterString.trim().toLowerCase();
        if (!search) return true;

        const uenMatch = company.UEN.toLowerCase().includes(search);
        const bizNameMatch = company.bizName.toLowerCase().includes(search);

        return uenMatch || bizNameMatch;
    })
    return filteredData
}

function validateVirtualPhoneNo(phone) {
    // Remove all non-digit characters first 
    // and prevent user to input more than 8 number
    const cleaned = phone.replace(/\D/g, '').slice(0, 8);
    // console.log("Phone: ", cleaned)
    // console.log("valid format: ", COMPANY_PHONE_PATTERN.test(cleaned))

    if(!COMPANY_PHONE_PATTERN.test(cleaned))
        return "Invalid Virtual Phone Format (8 digits and starting with 6)"
    else
        return ''
}

export default {
    getCompany,
    getCompanyBizFile,
    getCompanyRoles,
    getCompanySkillsets,
    GetCompanyRoles, // Not using
    GetCompanySkillsets, // Not using
    getBOUserProfile,
    setBOCompleteProfile,
    handleSelectedDetail,
    handleFilterUENBizName,
    validateVirtualPhoneNo
}