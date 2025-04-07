function getUsers (){
    const data = [
        {
            email: "bo1@gmail.com",
            UID: 1,
            role: 'Business Owner',
            nric: "S9348573K",
            isSuspended: false,
            isLoggedIn: false,
            lastUpdate: '15 / 03 / 2025',
            updateBy: "", 
            createdAt: "2025-3-25 12:00:08",
            lastOnline: '',
            reasonOfSuspend: '',
            hpNo: "+65 1111 1111",
            fullName: "BO 1",
            ownes: 1,
        }, 
        {
            email: "bo2@gmail.com",
            UID: 2,
            role: 'Business Owner',
            nric: "S9348233U",
            isSuspended: false,
            isLoggedIn: false,
            lastUpdate: '15 / 03 / 2025',
            updateBy: "", 
            createdAt: "2025-3-25 12:00:08",
            lastOnline: '',
            reasonOfSuspend: '',
            hpNo: "+65 1111 1112",
            fullName: "BO 2",
            ownes: 2,
        }, 
        {
            email: "bo3@gmail.com",
            UID: 3,
            role: 'Business Owner',
            nric: "S9348613E",
            isSuspended: false,
            isLoggedIn: false,
            lastUpdate: '15 / 03 / 2025',
            updateBy: "", 
            createdAt: "2025-3-25 12:00:08",
            lastOnline: '',
            reasonOfSuspend: '',
            hpNo: "+65 1111 1113",
            fullName: "BO 3",
            ownes: 3,
        }, 
        {
            email: "emp1@gmail.com",
            UID: 4,
            role: 'Employee',
            nric: "S9348933R",
            isSuspended: false,
            isLoggedIn: false,
            lastUpdate: '',
            updateBy: "", 
            createdAt: "2025-3-25 12:00:08",
            lastOnline: '',
            reasonOfSuspend: '',
            hpNo: "+65 1111 2221",
            fullName: "Emp 1",
            resStatusPassType: "Singapore Citizen/ PR",
            dateJoined: "2025-05-03",
            jobTitle: "Developer",
            roles:'["1", "2", "3"]',
            standardWrkHrs: 5.2,
            skillsets:'["1", "2", "3"]',
            noOfLeave: 10,
            noOfMC: 10,
            noOfLeaveAvailable: 10,
            noOfMCAvailable: 10,
            startWorkTime: "09:00",
            endWorkTime: "18:00",
            daysOfWork: '[1, 2, 3, 4, 5]',
            EmployedBy: 1,
        }, 
        {
            email: "emp2@gmail.com",
            UID: 5,
            role: 'Employee',
            nric: "S9458233T",
            isSuspended: false,
            isLoggedIn: false,
            lastUpdate: '',
            updateBy: "", 
            createdAt: "2025-3-25 12:00:08",
            lastOnline: '',
            reasonOfSuspend: '',
            hpNo: "+65 1111 2222",
            fullName: "Emp 2",
            resStatusPassType: "Singapore Citizen/ PR",
            dateJoined: "2025-05-03",
            jobTitle: "Developer",
            roles:'["1", "2", "3"]',
            standardWrkHrs: 5.2,
            skillsets:'["1", "2", "3"]',
            noOfLeave: 10,
            noOfMC: 10,
            noOfLeaveAvailable: 10,
            noOfMCAvailable: 10,
            startWorkTime: "09:00",
            endWorkTime: "18:00",
            daysOfWork: '[1, 2, 3, 4, 5]',
            EmployedBy: 1,
        }, 
        {
            email: "emp3@gmail.com",
            UID: 6,
            role: 'Employee',
            nric: "S9366233E",
            isSuspended: false,
            isLoggedIn: false,
            lastUpdate: '',
            updateBy: "", 
            createdAt: "2025-3-25 12:00:08",
            lastOnline: '',
            hpNo: "+65 1111 2223",
            fullName: "Emp 3",
            resStatusPassType: "Singapore Citizen/ PR",
            dateJoined: "2025-05-03",
            jobTitle: "Developer",
            roles:'["1"]',
            standardWrkHrs: 5.2,
            skillsets:'["2"]',
            noOfLeave: 10,
            noOfMC: 10,
            noOfLeaveAvailable: 10,
            noOfMCAvailable: 10,
            startWorkTime: "09:00",
            endWorkTime: "18:00",
            daysOfWork: '[1, 2, 3, 4, 5]',
            EmployedBy: 2,
        }, 
    ]
    return data;
}

async function getBOUsers () {
    const body = {

    };

    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/systemadmin/businessowner/list/view', {
            method: 'GET',
            body: JSON.stringify(),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            const data = await response.json();
            // console.log(data);
            return data;
        } else {
            throw new Error(`Failed to fetch Business Owner Users: ${response.status}`)
        }
    } catch(error) {
        console.log("Failed to load BO Users: \n", error);
        throw error
    }
}

async function getReportedIssue () {
    const body = {
        UID: 6,
        reasonOfSuspend: "WM - Try Access Testing" 
    };

    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/systemadmin/user/suspend', {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await response.json();
        console.log(data)
        return data;
    } catch(error) {
        console.log("Failed to load BO Users: \n", error);
        throw error
    }
}

function handleFilterRole (allData, role) {
    const filteredData = allData.filter((data) => {
        const roleMatch = role === "" || 
            data.role === role
        return roleMatch
    });
    return filteredData;
}

function getUserOwnesCompany (users, companyID) {
    // console.log("All Users", users)
    const userOwnes = users.filter((data) => {
        const cIDMatch = companyID === "" ||
            data.ownes === companyID
        return cIDMatch
    })
    // console.log("Company ownes by User", userOwnes)
    return userOwnes
}

function setUser(updatedData){
    console.log(updatedData)
}

function handleUserAccStatusFilter(companies, accStatus) {
    const filteredData = companies.filter((company) => {
        const dataAccStatus = company.owner[0].isSuspended
        // If accStatus is 'Activated'
        if (accStatus === 'Activated'){
            const IS_SUSPENDED = false  // The account is not suspended
            return dataAccStatus === IS_SUSPENDED  
        }
        else {
            const IS_SUSPENDED = true  // The account is suspended
            return dataAccStatus === IS_SUSPENDED  
        }
    })
    return filteredData;
}

export default {
    getUsers,
    handleFilterRole,
    getUserOwnesCompany,
    setUser,
    handleUserAccStatusFilter,
    getBOUsers,
    getReportedIssue,
}