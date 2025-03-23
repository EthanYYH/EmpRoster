function GetCompanyData (){
    const data = [
        {
            company: "GOOGLE VENTURES PTE. LTD.",
            uen: "202017097M",
            subsStatus: "Subscribed",
        },
        {
            company: "GOOGLE CARS",
            uen: "53137217X",
            subsStatus: "Subscribed",
        },
        {
            company: "GOOGLE CLOUD",
            uen: "53342345K",
            subsStatus: "Subscribed",
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

export default {
    GetCompanyData,
    GetCompanyRoles,
    GetCompanySkillsets,
}