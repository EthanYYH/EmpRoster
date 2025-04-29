import { HITPAY_API } from "../dbURL";

// return subscription transactions for each company
async function getSubscriptionTransactions () {
    const body = {

    };

    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/subscriptiontransaction/view', {
            method: 'GET',
            body: JSON.stringify(),
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

function getSubsTransForACompany (allSubsTrans, uen) {
    // console.log(`getSubsTransForACompany received data: \n`, allSubsTrans)
    const filteredData = allSubsTrans.filter((data) => {
        const companyMatch = uen === '' ||
            data.UEN === uen
        return companyMatch
    })
    return filteredData;
}

function getSortedSubsTransactions (subsTrans){
    // Sort by startDate in descending order (newest first)
    const sortedSubsTrans = subsTrans.sort((a, b) => {
        return new Date(b.startDate) - new Date(a.startDate)
    })

    return sortedSubsTrans;
}

function handleFilterSubsStatus (companies, status) {
    // console.log(companies)
    const filteredData = companies.filter((company) => {
        const DEFAULT_STATUS = 'Unsubscribed';
        const latestStatus = company.transactions?.[0]?.subsStatus || DEFAULT_STATUS;
        return status === '' || latestStatus === status;
    })
    return filteredData;
}

// Business owner view subs transaction
async function boGetSubscriptionTransactions (uen) {
    const body = {
        UEN: uen
    };

    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/subscriptiontransaction/view', {
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
        console.error(`Network error for UID ${uid}: \n`, error);
        throw new Error(`Failed to fetch company data: ${error.message}`);
    }
}

// Get All Subscription Plan
async function getSubsPlans () {
    const body = {
        
    };

    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/subscriptionplan/view', {
            method: 'GET',
            body: JSON.stringify(),
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
// Hitpay Create Payment Request => /v1/payment-requests
async function makeSubsPayment (subPlan, email, name, companyDetail) {
    const fullAddress = companyDetail.address.split(", Singapore")
    const addressLine1 = fullAddress[0].trim()
    const postCode = fullAddress[1].trim()

    const body = {
        allow_repeated_payments: false,
        add_admin_fee: false,
        send_email: false,
        send_sms: true,
        generate_qr: false,
        amount: subPlan.price,
        currency: 'SGD',
        payment_methods: ["paynow_online"],
        email: email,
        phone: '',
        address: {
            line1: addressLine1,
            country: "Singapore",
            postal_code: postCode,
            state: "Singapore",
            city: "Singapore"
        },
        name: name
    };
    // console.log(JSON.stringify(body))
    try{
        const response = await fetch('https://api.sandbox.hit-pay.com/v1/payment-requests', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'X-BUSINESS-API-KEY': {HITPAY_API},
                'Content-Type': 'application/json'
            },
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
    getSubscriptionTransactions,
    getSubsTransForACompany,
    getSortedSubsTransactions,
    handleFilterSubsStatus,
    boGetSubscriptionTransactions,
    getSubsPlans,
    makeSubsPayment
}