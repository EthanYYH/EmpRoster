function getSubscriptions (){
    const data = [
        { 
            subsPlanID: 1,
            subscription_name:"Free",
            subscription_plan_description: "With all function but limited to 2 Employees only",
            price: 0,
            noOfEmps: 2,
            createdAt: "2024-11-15T08:23:45",
        },
        { 
            subsPlanID: 2,
            subscription_name:"Basic",
            subscription_plan_description: "With all function but limited to 20 Employees only",
            price: 20,
            noOfEmps: 20,
            createdAt: "2024-09-03T14:56:12",
        }, 
        { 
            subsPlanID: 3,
            subscription_name:"Advance",
            subscription_plan_description: "With all function,\n$20 + $3 after 20 employees",
            price: 20, // every employees after 20 (+ $3)
            noOfEmps: '', // Empty mean unlimited
            createdAt: "2024-12-22T17:34:09",
        },
    ]
    return data;
}

// return subscription transactions for each company
async function getSubscriptionTransactions () {
    const body = {

    };

    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/systemadmin/company/subscription/view', {
            method: 'GET',
            body: JSON.stringify(),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            throw new Error(`Failed to fetch Subscription Transactions: ${response.status}`)
        }
    } catch(error) {
        console.log("Failed to load Subscription Transactions: \n", error);
        throw error
    }
}

function getSubsTransForACompany (allData, companyID) {
    const filteredData = allData.filter((data) => {
        const companyMatch = companyID === '' ||
            data.subscripts === companyID
        return companyMatch
    })
    return filteredData;
}

function getSortedSubsTransactions (subsTrans){
    // Sort by createdAt in descending order (newest first)
    const latestSubsTrans = subsTrans.sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return latestSubsTrans;
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

export default {
    getSubscriptions,
    getSubscriptionTransactions,
    getSubsTransForACompany,
    getSortedSubsTransactions,
    handleFilterSubsStatus,
}