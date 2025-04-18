import { format } from 'date-fns';

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s]+$/
export const PW_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
export const COMPANY_PHONE_PATTERN = /^[6]\d{7}$/ // Valid singapore virtual number starting with 6
export const PHONE_PATTERN = /^[89]\d{7}$/ // Valid singapore phone number starting with 8,9
export const NRIC_PATTERN = /^[A-Z]\d{7}[A-Z]$/ // Valid singapore work pass type common pattern
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
export const PASS_TYPE = ['Singapore Citizen/PR', 'Employment Pass', 'S Pass', 'Work Permit', 'Other Work Pass']
export const IS_ACC_SUSPENDED = ['Activated', 'Suspended']

export function formatDateTime (isoString){
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long'
    }).format(new Date(isoString), 'dd/MM/yyyy hh:mm tt')
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

export function formatNRIC (nric) {
    return nric
        .replace(/[^a-zA-Z0-9]/g, '') // Remove non-alphanumeric
        .slice(0, 9)                  // Limit to 9 chars
        .toUpperCase();               // Force uppercase
};