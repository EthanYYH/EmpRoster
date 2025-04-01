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
function getSubscriptionTransactions () {
    const data = [
        {
            subsTransID: 1,
            startDate: "2025-03-23",
            endDate: "2025-04-23",
            subsStatus: "Subscribed",
            reasonOfCancel: '',
            createdAt: "2025-03-23T17:34:09",
            subscripts: 1,
            subscriptedBy: 2,
        },
        {
            subsTransID: 2,
            startDate: "2025-03-26",
            endDate: "2025-04-26",
            subsStatus: "Subscribed",
            reasonOfCancel: '',
            createdAt: "2025-03-26T17:34:09",
            subscripts: 2,
            subscriptedBy: 2,
        },
        {
            subsTransID: 3,
            startDate: "2025-02-22",
            endDate: "2025-03-22",
            subsStatus: "Unsubscribed",
            reasonOfCancel: '',
            createdAt: "2025-02-22T17:34:09",
            subscripts: 1,
            subscriptedBy: 1,
        },
    ]
    return data;
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

export default {
    getSubscriptions,
    getSubscriptionTransactions,
    getSubsTransForACompany,
    getSortedSubsTransactions,
}