// controller/EditEmployeeDetails.js


// Edit an employee's details using PATCH request
const EditEmployee = async (employeeData) => {
  try {
    const response = await fetch("https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/company/employee/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employeeData), // Sending the employee data as JSON
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
<<<<<<< HEAD
    if (data.success) {
      console.log("Employee updated successfully:", data);
      return data; // Returning success response or data
    } else {
      console.error("Failed to update employee:", data);
=======

    
    if (data.message="Employee updated successfully") {
      console.log("Employee updated successfully:", data);
      return data; // Returning success response or data
    } else {
      console.error("Failed to update employee:");
>>>>>>> 137fa90da682af594a11dfe3b5eefdfba6eb6c51
      return null; // Return null if the update fails
    }
  } catch (error) {
    console.error("Failed to update employee:", error);
    return null; // Return null in case of error
  }
};

export {EditEmployee };
