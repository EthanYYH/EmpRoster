import { useState } from "react";
import "../../../../public/styles/common.css";


import EditButton from "../../../components/PrimaryButton/PrimaryButton"; 
import SubmitButton from "../../../components/SecondaryButton/SecondaryButton";
import { useAlert } from "../../../components/PromptAlert/AlertContext"; 
import "./EmpViewEmployeeDetail.css";

const EmpViewEmployeeDetail = () => {
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

  const { showAlert } = useAlert();

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSubmitClick = () => {
    showAlert(
      `Employee details for ${employee.name} have been updated`,
      "The employee information has been successfully updated.",
      "Update Success",
      { type: "success" }
    );
    setEditMode(false);
  };

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

  return (
    <div className="viewProfileContainer">
      
      {/* <SideMenu /> */}
      <div className="viewProfileContent">
        <h2>Employee Detail</h2>
        <table className="employeeDetailTable">
          <tbody>
            {Object.entries(employee).map(([key, value]) => {
              if (key === "user_id") return null; // hide user_id
              return (
                <tr key={key}>
                  <th>{headerMap[key] || key}</th>
                  <td>
                    {editMode && (key === "email" || key === "hpNo") ? (
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

        <div className="buttonRow">
          {!editMode ? (
            <EditButton onClick={handleEditClick} text="Edit" />
          ) : (
            <SubmitButton onClick={handleSubmitClick} text="Confirm" />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmpViewEmployeeDetail;
