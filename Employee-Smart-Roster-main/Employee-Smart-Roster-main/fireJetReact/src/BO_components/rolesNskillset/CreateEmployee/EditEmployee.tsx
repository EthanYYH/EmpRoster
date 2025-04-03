import { useState } from "react";
import "./employeeForm.css";
import SubmitButton from "../../../components/PrimaryButton/PrimaryButton";
import { useAlert } from "../../../components/PromptAlert/AlertContext";
import profile from "./Profile.png";

//https://e27fn45lod.execute-api.ap-southeast-2.amazonaws.com/dev/business-owner/company/employee/update

// Define types for PopupTable props
interface PopupTableProps {
  onClose: () => void;
  employeeData: {
    name: string;
    profilePhoto: string | null;
    wage: string;
    address: string;
    skillset: string;
    email: string;
    role: string;
    workingHours: string;
    status: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: () => void;
  buttonText: string;
}

const PopupTable: React.FC<PopupTableProps> = ({
  onClose,
  employeeData,
  handleInputChange,
  handleSubmit,
  buttonText,
}) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close-button" onClick={onClose}>X</button>
        <div className="popup-header">
          <div className="title">Update Employee Details</div>
        </div>

        <table className="createEmployeeTable">
          <tbody>
            <tr>
              <td>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Employee Name"
                  value={employeeData.name}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                <div className="buttonContainer">
                  <img src={profile} className="logo2" alt="Profile" />
                </div>
              </td>
              <td>
                <label>Wage</label>
                <input
                  type="text"
                  name="wage"
                  className="input-field"
                  placeholder="Wage"
                  value={employeeData.wage}
                  onChange={handleInputChange}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={employeeData.address}
                  onChange={handleInputChange}
                />
              </td>
              <td></td>
              <td>
                <label>Skillset</label>
                <select
                  name="skillset"
                  value={employeeData.skillset}
                  onChange={handleInputChange}
                >
                  {/* Replace with your actual skillset options */}
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Fullstack">Fullstack</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={employeeData.email}
                  onChange={handleInputChange}
                />
              </td>
              <td></td>
              <td>
                <label>Role</label>
                <select
                  name="role"
                  value={employeeData.role}
                  onChange={handleInputChange}
                >
                  {/* Replace with your actual role options */}
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Employee">Employee</option>
                  <option value="Intern">Intern</option>
                </select>
              </td>
            </tr>

            <tr>
              <td>
                <label>Working Hours</label>
                <input
                  type="text"
                  name="workingHours"
                  placeholder="Working Hours"
                  value={employeeData.workingHours}
                  onChange={handleInputChange}
                />
              </td>
              <td></td>
              <td>
                <label>Status</label>
                <select
                  name="status"
                  value={employeeData.status}
                  onChange={handleInputChange}
                >
                  <option value="Subscribed">Subscribed</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </td>
            </tr>

            <tr>
              <td></td>
              <td>
                <div className="buttonContainer">
                  <SubmitButton onClick={handleSubmit} text={buttonText} />
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function EditEmployee() {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    profilePhoto: null,
    wage: "",
    address: "",
    skillset: "",
    email: "",
    role: "",
    workingHours: "",
    status: "Subscribed",
  });

  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const { showAlert } = useAlert();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    console.log("Employee Data Edited:", employeeData);
    showAlert(
      `Account Edited for ${employeeData.name}`,
      "The employee account has been successfully edited.",
      "Account Edited",
      { type: "success" }
    );
    setIsEditPopupOpen(false);
  };

  const handleOpenEditPopup = () => {
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  return (
    <div>
      <div className="buttonContainer">
        <SubmitButton onClick={handleOpenEditPopup} text="Edit Details" />
      </div>

{/* use <div className="App-popup">, css from App.css 

*/}

      {isEditPopupOpen && (
        <PopupTable
          onClose={handleCloseEditPopup}
          employeeData={employeeData}
          handleInputChange={handleInputChange}
          handleSubmit={handleEdit}
          buttonText="Submit"
        />
      )}

<div className="App-popup">
</div>
    </div>
  );
}
