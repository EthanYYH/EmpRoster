import { format } from 'date-fns';

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s]+$/
export const PW_PATTERN = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/

export function formateDateTime (isoString){
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long'
    }).format(new Date(isoString), 'dd/MM/yyyy hh:mm tt')
}

// export default {
//     formateDateTime,
// }