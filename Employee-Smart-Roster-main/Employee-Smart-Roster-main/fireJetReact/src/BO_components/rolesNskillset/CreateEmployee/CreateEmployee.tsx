import { useState } from "react";
import Nav from "../../../components/NavBar/NavBar";
import SideMenu from "../../../components/SideMenu/BOSide";
import "../../../../public/styles/common.css";
import "./CreateEmployee.css";
import SubmitButton from "../../../components/PrimaryButton/PrimaryButton";
import { useAlert } from '../../../components/PromptAlert/AlertContext';

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

  const { showAlert } = useAlert(); // Access showAlert from useAlert

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApprove = () => {
    // Here, you can update data if necessary
    console.log("Employee Data Approved:", employeeData);
    
    // Trigger the success alert using showAlert
    showAlert(
      `Account Created for ${employeeData.name}`,
      "The employee account has been created successfully.",
      "Account Created", // Custom success message
      { type: 'success' } // Alert type
    );
  };

  return (
    <div className="main-container">
      <Nav />
      <SideMenu />
      <div className="logo">EmpRoster</div>

      <div className="formContainer">
        <table className="createEmployeeTable">
          <thead>
            <tr>
              <th>Name</th>
              <th>Create Account</th>
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
                <input
                  type="file"
                  name="profilePhoto"
                  className="input-field"
                  accept="image/*"
                />
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
                  <SubmitButton onClick={handleApprove} text="Create Account" />
                </div>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
