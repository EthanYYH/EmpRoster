function getCompanies (){
    const data = [
        {
            cID: 1,
            UEN: "202017097M",
            bizName: "GOOGLE VENTURES PTE. LTD.",
            contactNo: "+65 6666 1111",
            bizFilePath: "https://mymailsimedu-my.sharepoint.com/:b:/g/personal/wmlim014_mymail_sim_edu_sg/EfaXUfD99AdHrSO5GjbQNssBfoSXi7ZLWPO2oGbLADvDAA?e=MT6By8",
            email: "GoogleVentures@gmail.com",
            address: "#01-01 Clementi S111111",
            createdAt: "2025-3-25 12:00:08",
            lastUpdate: "",
        },
        {
            cID: 2,
            UEN: "53137217X",
            bizName: "GOOGLE CARS",
            contactNo: "+65 6666 1112",
            bizFilePath: "https://mymailsimedu-my.sharepoint.com/:b:/g/personal/wmlim014_mymail_sim_edu_sg/EfaXUfD99AdHrSO5GjbQNssBfoSXi7ZLWPO2oGbLADvDAA?e=MT6By8",
            email: "GoogleCars@gmail.com",
            address: "#02-02 Clementi S111122",
            createdAt: "2025-3-25 12:00:08",
            lastUpdate: "",
        },
        {
            cID: 3,
            UEN: "53342345K",
            bizName: "GOOGLE CLOUD",
            contactNo: "+65 6666 1113",
            bizFilePath: "https://mymailsimedu-my.sharepoint.com/:b:/g/personal/wmlim014_mymail_sim_edu_sg/EfaXUfD99AdHrSO5GjbQNssBfoSXi7ZLWPO2oGbLADvDAA?e=MT6By8",
            email: "GoogleCloud@gmail.com",
            address: "#03-03 Clementi S111133",
            createdAt: "2025-3-25 12:00:08",
            lastUpdate: "",
        }
    ]
    return data;
}

function GetCompanyRoles (){
    const data = [
        {
            uen: "202017097M",
            role: "Programmer",
        },
        {
            uen: "202017097M",
            role: "Database Designer",
        },
        {
            uen: "202017097M",
            role: "UI Designer",
        },
        {
            uen: "53342345K",
            role: "Project Manager",
        },
        {
            uen: "53342345K",
            role: "Financial",
        },
    ]
    return data;
}

function GetCompanySkillsets (){
    const data = [
        {
            uen: "202017097M",
            skill: "React",
        },
        {
            uen: "202017097M",
            skill: "Figma",
        },
        {
            uen: "202017097M",
            skill: "Draw.io",
        },
        {
            uen: "53342345K",
            skill: "Microsoft Project",
        },
        {
            uen: "53342345K",
            skill: "Visual Studio",
        },
    ]
    return data;
}

const handleSelectedDetail = (selectedCompany) => {
    return selectedCompany;
}

const handleFilterUENBizName = (companies, filterString) => {
    const filteredData = companies.filter((company) => {
        const search = filterString.trim().toLowerCase();
        if (!search) return true;

        const uenMatch = company.UEN.toLowerCase().includes(search);
        const bizNameMatch = company.bizName.toLowerCase().includes(search);

        return uenMatch || bizNameMatch;
    })
    return filteredData
}

export default {
    getCompanies,
    GetCompanyRoles,
    GetCompanySkillsets,
    handleSelectedDetail,
    handleFilterUENBizName,
}