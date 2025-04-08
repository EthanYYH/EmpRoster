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

export default {
    getSubscriptions,
    getSubscriptionTransactions,
    getSubsTransForACompany,
    getSortedSubsTransactions,
    handleFilterSubsStatus,
}