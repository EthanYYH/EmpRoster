import { format } from 'date-fns';

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s]+$/
export const PW_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
export const COMPANY_PHONE_PATTERN = /^[6]\d{7}$/ // Valid singapore virtual number starting with 6
export const PHONE_PATTERN = /^[89]\d{7}$/ // Valid singapore phone number starting with 8,9
export const NRIC_PATTERN = /^[A-Z][0-9]{7}[A-Z]$/ // Valid singapore work pass type common pattern
export const NO_DATA_MATCHED = "No Data Match with Filter...";

// Variables for calendar
export const TODAY = new Date();
export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const YEAR_CHANGE = ['prevYear', 'nextYear'];

// ENUM in DB
export const USER_ROLE = ['System Admin', 'Business Owner', 'Employee']
export const TASK_STATUS = ['Not Started', 'In Progress', 'Completed'];
export const REG_STATUS = ["Pending", "Approved", "Rejected"];
export const SUB_STATUS = ['Subscribed', 'Pending Payment', 'Unsubscribed', 'Cancelled Subscription'];
export const PASS_TYPE = ['Singapore Citizen/PR', 'Employment Pass', 'S Pass', 'Work Permit', 'Other Work Pass'];
export const IS_ACC_SUSPENDED = ['Activated', 'Suspended'];

// SG MOM Rules: last update on 20 Apr 2025
// MC: https://www.mom.gov.sg/employment-practices/leave/sick-leave/eligibility-and-entitlement
// Need to check everytime employee when login
// (EVERY MONTH +3 Until Max 6 months)
export const FIRST_3_MIN_MC =  5 // 1st 3 month Outpatient sick leave
export const FIRST_6_MIN_MC = 14 // 1st 6 month Outpatient sick leave 

// ANNUAL LEAVE: https://www.mom.gov.sg/employment-practices/leave/annual-leave/eligibility-and-entitlement
// (EVERY YEAR +1 until Max 8 Year)
export const MIN_YEAR1_ANNUAL = 7 // 1st year annual leave
export const MIN_YEAR8_ANNUAL = 14 // 8th and after that year annual leave

export function formatDateTime (isoString){
    const date = new Date(isoString);

    // Set Singapore timezone
    const sgDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));

    const day = String(sgDate.getDate()).padStart(2, '0');
    const month = String(sgDate.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const year = sgDate.getFullYear();

    let hours = sgDate.getHours();
    const minutes = String(sgDate.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12

    const formattedHours = String(hours).padStart(2, '0');

    return `${day}/${month}/${year} ${formattedHours}:${minutes} ${ampm}`;
}

export function generateSGDateTimeForDateTimeInput(date) {
    const sgDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Singapore' }));

    const year = sgDate.getFullYear();
    const month = String(sgDate.getMonth() + 1).padStart(2, '0');
    const day = String(sgDate.getDate()).padStart(2, '0');
    const hours = String(sgDate.getHours()).padStart(2, '0');
    const minutes = String(sgDate.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export async function encodeFileContent(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            // reader.result looks like: "data:application/pdf;base64,..."
            const base64String = reader.result.split(',')[1]; // remove prefix
            resolve(base64String);
        };

        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export function convertDateToSGTime (timeStamp) {
    const dateTime = new Date(timeStamp);
    dateTime.setHours(dateTime.getHours() - 2);
    return new Date(dateTime).toISOString().split('T');
}

export function formatPhoneNumber (phone) {
    // Remove all non-digit characters first 
    // and prevent user to input more than 8 number
    const cleaned = phone.replace(/\D/g, '').slice(0, 8);
    // Insert a space after every 4 digits
    return cleaned.length > 4 
        ? `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`
        : cleaned;
}

export function formatPosterCode (postCode) {
    // Remove all non-digit characters first 
    // and prevent user to input more than 6 number
    const cleaned = postCode.replace(/\D/g, '').slice(0, 6);
    // Insert a space after every 4 digits
    return cleaned;
}

export function formatNRIC (nric) {
    const raw = nric.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();

    let result = '';

    // 1st char: A-Z
    if (raw.length >= 1 && /[A-Z]/.test(raw[0])) {
        result += raw[0];
    }

    // Next 7 chars: only digits
    for (let i = 1; i <= 7 && raw.length > i; i++) {
        if (/\d/.test(raw[i])) {
            result += raw[i];
        }
    }

    // Last char: A-Z
    if (raw.length >= 9 && /[A-Z]/.test(raw[8])) {
        result += raw[8];
    }

    return result;
};

export function hideNRIC (nric) {
    const last4 = nric.slice(-4); // Get last 4 characters
    return last4.padStart(nric.length, '*'); // Fill the rest with *
}

export function formatKey(key) {
    return key
        .replace(/([A-Z])/g, ' $1')   // insert space before capital letters
        .replace(/^./, str => str.toUpperCase()); // capitalize first letter
}