// return all tasks
async function getTimelines (boID) {
    const body = {
        business_owner_id: boID
    };

    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/timeline/view', {
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

// return get aloocated task's detail
async function getTaskDetail (userID) {
    const body = {
        employee_user_id: userID
    };

    try{
        const response = await fetch('https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/employee/task/view', {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
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
    getTimelines, 
    getTaskDetail,
}