import { useState } from "react";
import Nav from "../../../../components/NavBar/NavBar";
import SideMenu from "../../../../components/SideMenu/BOSide";
import "../../../../public/styles/common.css";
import "./CreateEmployee.css";
import SubmitButton from "../../../../components/PrimaryButton/PrimaryButton";
import { useAlert } from "../../../../components/PromptAlert/AlertContext";
import EditEmployee from "./EditEmployee";
import profile from "./Profile.png"
    
    

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

const PopupTable: React.FC<PopupTableProps> = ({ onClose, employeeData, handleInputChange, handleSubmit, buttonText }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close-button" onClick={onClose}>X</button>
        <div className="popup-header">
          <div className="LandingTitle">{buttonText}</div>
        </div>

        <table className="createEmployeeTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>            <div className="buttonContainer">
                <img src={profile} className="logo2" alt="Logo" />
                </div></th>
              <th>Wage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="name"
                  placeholder="Employee Name"
                  value={employeeData.name}
                  onChange={handleInputChange}
                />
              </td>
              <td>
                {/* <input
                  type="file"
                  name="profilePhoto"
                  className="input-field"
                  accept="image/*"
                /> */}
    
              </td>
              <td>
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
              <th>Address</th>
              <th></th>
              <th>Skillset</th>
            </tr>
            <tr>
              <td>
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
                <input
                  type="text"
                  name="skillset"
                  placeholder="Skillset"
                  value={employeeData.skillset}
                  onChange={handleInputChange}
                />
              </td>
            </tr>

            <tr>
              <th>Email</th>
              <th></th>
              <th>Role</th>
            </tr>
            <tr>
              <td>
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
                <input
                  type="text"
                  name="role"
                  placeholder="Role"
                  value={employeeData.role}
                  onChange={handleInputChange}
                />
              </td>
            </tr>

            <tr>
              <th>Working Hours</th>
              <th></th>
              <th>Status</th>
            </tr>
            <tr>
              <td>
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

export default function CreateEmployee() {
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

  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const { showAlert } = useAlert();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = () => {
    console.log("Employee Data Created:", employeeData);
    showAlert(
      `Account Created for ${employeeData.name}`,
      "The employee account has been created successfully.",
      "Account Created",
      { type: "success" }
    );
    setIsCreatePopupOpen(false);
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

  const handleOpenCreatePopup = () => {
    // Ensure only one popup is open at a time
    setIsCreatePopupOpen(true);
    setIsEditPopupOpen(false); // Close the Edit popup if it was open
  };

  const handleOpenEditPopup = () => {
    // Ensure only one popup is open at a time
    setIsEditPopupOpen(true);
    setIsCreatePopupOpen(false); // Close the Create popup if it was open
  };

  const handleCloseCreatePopup = () => {
    setIsCreatePopupOpen(false);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
  };

  return (
    <div className="main-container">
      <Nav />
      <SideMenu />
      <EditEmployee/>
      <div className="logo">EmpRoster</div>

      <div className="buttonContainer">
        <SubmitButton onClick={handleOpenCreatePopup} text="Create Account" />
      </div>
      <div className="buttonContainer">
        <SubmitButton onClick={handleOpenEditPopup} text="Edit Details" />
      </div>

      {isCreatePopupOpen && (
        <PopupTable
          onClose={handleCloseCreatePopup}
          employeeData={employeeData}
          handleInputChange={handleInputChange}
          handleSubmit={handleCreate}
          buttonText="Create Account"
        />
      )}

      {isEditPopupOpen && (
        <PopupTable
          onClose={handleCloseEditPopup}
          employeeData={employeeData}
          handleInputChange={handleInputChange}
          handleSubmit={handleEdit}
          buttonText="Edit Details"
        />
      )}
    </div>
  );
}
