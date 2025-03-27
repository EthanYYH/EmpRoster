function getRegistrationRequest (){
    const data = [
        {
            registrationID: 1,
            email: "company1@example.com",
            UEN: "202452226G",
            bizName: "FUSIONTECH INNOVATIONS PTE. LTD.",
            bizFileID: 1,
            status: "Pending",
            lastUpdate: "",
            updateBy: "",
            createdAt: "2025-3-25 12:00:08",
            reasonOfReject: "",
        },
        {
            registrationID: 2,
            email: "company2@example.com",
            UEN: "202345699N",
            bizName: "#LAIPLAYLEOW PTE. LTD.",
            bizFileID: 2,
            status: "Pending",
            lastUpdate: "",
            updateBy: "",
            createdAt: "2025-3-25 12:00:09",
            reasonOfReject: "",
        },
        {
            registrationID: 3,
            email: "company3@example.com",
            UEN: "53404282A",
            bizName: "1 SHENG TOU YUAN",
            bizFileID: 3,
            status: "Pending",
            lastUpdate: "",
            updateBy: "",
            createdAt: "2025-3-25 13:00:00",
            reasonOfReject: "",
        },
        {
            registrationID: 4,
            email: "company4@example.com",
            UEN: "202505640G",
            bizName: "2 CONSTRUCTION PTE. LTD.",
            bizFileID: 4,
            status: "Approved",
            lastUpdate: "",
            updateBy: "",
            createdAt: "2025-3-24 15:00:00",
            reasonOfReject: "",
        },
        {
            registrationID: 5,
            email: "company5@example.com",
            UEN: "2016136",
            bizName: "hahahaha",
            bizFileID: 5,
            status: "Rejected",
            lastUpdate: "",
            updateBy: "",
            createdAt: "2025-3-24 15:30:00",
            reasonOfReject: "The UEN and Company name are not registered in ACRA",
        },
    ]
    return data;
}

function setRegistrationRequest(updatedData){
    console.log(updatedData)
}

function handleFilterRegsStatus(allData, filterStatus){
    const filteredData = allData.filter((data) => {
        const statusMatch = filterStatus === "" || 
            data.status === filterStatus
        return statusMatch
    });
    return filteredData;
}

function handleFilterRegsUEN(allData, filterUEN){
    const filteredData = allData.filter((data) => {
        const uenMatch = filterUEN === "" || 
            data.UEN.toUpperCase().includes(filterUEN.toUpperCase())
        return uenMatch
    });
    return filteredData;
}

function handleFilterRegsBizName(allData, filterBizName){
    const filteredData = allData.filter((data) => {
        const bizNameMatch = filterBizName === "" || 
            data.bizName.toUpperCase().includes(filterBizName.toUpperCase())
        return bizNameMatch
    });
    return filteredData;
}

const handleSelectedDetail = (seletedRequest) => {
    return seletedRequest
}

const handleCloseDetail = () => {
    return null
}

export default {
    getRegistrationRequest,
    setRegistrationRequest, 
    handleFilterRegsStatus,
    handleFilterRegsUEN,
    handleFilterRegsBizName,
    handleSelectedDetail,
    handleCloseDetail,
}