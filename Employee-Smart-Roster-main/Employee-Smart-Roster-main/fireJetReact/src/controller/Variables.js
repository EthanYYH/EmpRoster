import { format } from 'date-fns';

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s]+$/
export const PW_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/
export const NO_DATA_MATCHED = "No Data Match with Filter...";

// Variables for calendar
export const TODAY = new Date();
export const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const YEAR_CHANGE = ['prevYear', 'nextYear'];

// ENUM in DB
export const USER_ROLE = ['System Admin', 'Business Owner', 'Employee']
export const TASK_STATUS = ['Not Started', 'In Progress', 'Completed'];
export const REG_STATUS = ["Pending", "Approved", "Rejected"]

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
