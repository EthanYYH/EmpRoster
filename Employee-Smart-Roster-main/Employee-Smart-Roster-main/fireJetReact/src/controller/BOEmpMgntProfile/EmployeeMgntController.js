// EmployeeMgntController.js
async function getEmployeeList(business_owner_id) {
    const apiUrl = "https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/company/employee/view";
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ business_owner_id })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      // console.log("Employee data:", data); // Log the complete response data
  
      return data;
    } catch (error) {
      console.error("Error in getEmployeeList:", error);
      throw error;
    }
  }
  
  export default {
    getEmployeeList,
  };
  