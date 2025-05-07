async function getAllReportedIssues(uid) {
    const body = {
        user_id: uid
    }

    try {
        const response = await fetch(
            'https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/issue/view',
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // console.log("API Response Status:", response);
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);

        return await data // Spread any additional fields from the API response
    } catch (error) {
        throw new Error(`Failed to fetch reported issues: ${error.message}`);
    }
}

async function createNewIssueReport(uid, values) {
    const body = {
        user_id: uid,
        title: values.title,
        issue_description: values.issue_description,
        issuesCategory: values.issuesCategory
    }

    try {
        const response = await fetch(
            'https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/issue/add',
            {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        // console.log("API Response Status:", response);
        if(!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `HTTP error status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);

        return await data // Spread any additional fields from the API response
    } catch (error) {
        throw new Error(`Failed to create issue: ${error.message}`);
    }
}

export default {
    getAllReportedIssues,
    createNewIssueReport,
}