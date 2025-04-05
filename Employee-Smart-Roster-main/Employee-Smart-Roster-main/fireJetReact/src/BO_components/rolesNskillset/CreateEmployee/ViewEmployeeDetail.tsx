import { useState } from "react";
import "../../../../public/styles/common.css";
import Nav from "../../../components/NavBar/NavBar";
import SideMenu from "../../../components/SideMenu/BOSide";
import SubmitButton from "../../../components/PrimaryButton/PrimaryButton"; 
import { useAlert } from "../../../components/PromptAlert/AlertContext"; 
import "./ViewEmployeeDetail.css";

const ViewEmployeeDetail = () => {
  const [editMode, setEditMode] = useState(false);
  const [employee, setEmployee] = useState({
    user_id: 4,
    name: "John Doe",
    email: "employee2new@example.com",
    hpNo: 90002222,
    resStatusPassType: "Work Permit",
    jobTitle: "Manager of the Beaunite Group",
    roles: "Developer",
    standardWrkHrs: 5,
    skillsets: "Java",
    noOfLeave: 5,
    noOfLeaveAvailable: 5,
    noOfMC: 4,
    noOfMCAvailable: 4,
    startWorkTime: "10:00:00",
    endWorkTime: "11:00:00",
    daysOfWork: 6,
    activeOrInactive: 1,
  });

  const handleChange = (field: string, value: any) => {
    setEmployee((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEdit = () => {
    if (editMode) {
      // If we're confirming the edit, show the alert
      showAlert(
        `Employee details for ${employee.name} have been updated`, // Title
        "The employee information has been successfully updated.", // Message
        "Update Success", // Alert type
        { type: "success" } // Type of alert (success)
      );
    }
    setEditMode(!editMode);
    // You may want to save the data to the API here as well
  };

  // Mapping for better header titles
  const headerMap: { [key: string]: string } = {
    name: "Name",
    email: "Email",
    hpNo: "Phone Number",
    resStatusPassType: "Pass Type",
    jobTitle: "Job Title",
    roles: "Roles",
    standardWrkHrs: "Standard Working Hours",
    skillsets: "Skillsets",
    noOfLeave: "Total Leave",
    noOfLeaveAvailable: "Available Leave",
    noOfMC: "Total MC",
    noOfMCAvailable: "Available MC",
    startWorkTime: "Start Work Time",
    endWorkTime: "End Work Time",
    daysOfWork: "Days of Work",
    activeOrInactive: "Status",
  };

  // Use the showAlert function from useAlert
  const { showAlert } = useAlert();

  return (
    <div className="viewProfileContainer">
      <Nav />
      <SideMenu />
      <div className="viewProfileContent">
        <h2>Employee Detail</h2>
        <table className="employeeDetailTable">
          <tbody>
            {Object.entries(employee).map(([key, value]) => {
              if (key === "user_id") return null; // We don't show user_id
              return (
                <tr key={key}>
                  <th>{headerMap[key] || key}</th>
                  <td>
                    {editMode ? (
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => handleChange(key, e.target.value)}
                      />
                    ) : (
                      value
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="editBtn" onClick={toggleEdit}>
          {editMode ? "Confirm" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default ViewEmployeeDetail;
