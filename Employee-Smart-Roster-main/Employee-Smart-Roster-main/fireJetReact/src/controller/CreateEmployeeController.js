function cleanUndefined(obj) {
    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [key, value === undefined ? null : value])
    );
}

function validateEmployeePayload(values) {
    const requiredFields = [
        "business_owner_id",
        "user_id",
        "email",
        "hpNo",
        "resStatusPassType",
        "jobTitle",
        "roleID",
        "standardWrkHrs",
        "skillSetID",
        "noOfLeave",
        "noOfLeaveAvailable",
        "noOfMC",
        "noOfMCAvailable",
        "startWorkTime",
        "endWorkTime",
        "daysOfWork",
        "activeOrInactive"
    ];

    for (const field of requiredFields) {
        if (values[field] === undefined) {
            console.warn(`❗ Missing field: ${field}`);
            // Optional: throw an error instead of sending null
            // throw new Error(`Missing required field: ${field}`);
        }
    }
}

async function createEmployee(values) {
    validateEmployeePayload(values);

    const body = cleanUndefined({
        business_owner_id: values.business_owner_id,
        user_id: values.user_id,
        email: values.email,
        hpNo: values.hpNo,
        resStatusPassType: values.resStatusPassType,
        jobTitle: values.jobTitle,
        roleID: values.roleID,
        standardWrkHrs: values.standardWrkHrs,
        skillSetID: values.skillSetID,
        noOfLeave: values.noOfLeave,
        noOfLeaveAvailable: values.noOfLeaveAvailable,
        noOfMC: values.noOfMC,
        noOfMCAvailable: values.noOfMCAvailable,
        startWorkTime: values.startWorkTime,
        endWorkTime: values.endWorkTime,
        daysOfWork: values.daysOfWork,
        activeOrInactive: values.activeOrInactive,
    });

    console.log("🚀 Sending employee data to API:", body);

    try {
        const response = await fetch(
            'https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/company/employee/add',
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        console.log("🔁 API Response Status:", response.status);

        if (response.ok) {
            const data = await response.json();
            console.log("✅ Employee created:", data);
            return data;
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || `❌ Create employee failed: ${response.status}`);
        }
    } catch (error) {
        console.error("🚨 CreateEmployee error:", error.message);
        throw error;
    }
}

export default {
    createEmployee
};
