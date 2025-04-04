import { useState } from "react";
import "../../../../public/styles/common.css";
import SubmitButton from "../../../components/PrimaryButton/PrimaryButton";
import { IoClose } from "react-icons/io5"; 
import { useAlert } from "../../../components/PromptAlert/AlertContext"; 
import "./CreateEmployee.css"


const CreateAccount = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // Initialize employeeData state
    const [employeeData, setEmployeeData] = useState({
        name: "",
        profilePhoto: "",
        skillset: "",
        email: "",
        role: "",
        workingHours: "",
        status: "",
    });

    // showAlert function from WenMi's useAlert component
    const { showAlert } = useAlert();

    // Handle input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setEmployeeData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    //  Handle form submission
    const handleSubmit = () => {
        console.log("Submitted Employee Data:", employeeData);
        // Trigger the alert after form submission
        showAlert(
            `Employee Account Created for ${employeeData.name}`, // Title
            "The employee account has been created successfully.", // Message
            "Account Created", // Alert type
            { type: "success" } // Type of alert (success)
        );
        setIsPopupOpen(false);
    };

    const buttonText = "Submit";

    return (
        <div>
            <SubmitButton onClick={() => setIsPopupOpen(true)} text="Create Account" />

            {/* Popup Section */}
            {isPopupOpen && (
                <div className="App-popup">
                    <div className="App-popup-content">

                        <div className='App-header'>
                            <h1>Create Account</h1>
                            <button className='icons' onClick={() => setIsPopupOpen(false)}>
                                <IoClose />
                            </button>
                        </div>

                        <table className="createEmployeeTable">
                            <tbody>
                                {/* First row: Name, Email, and Working Hours */}
                                <tr>
                                    <td>
                                        <label>Name</label>
                                        <input
                                            className="full-width"
                                            type="text"
                                            name="name"
                                            placeholder="Employee Name"
                                            value={employeeData.name}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                    <td>
                                        <label>Email</label>
                                        <input
                                            className="full-width"

                                            type="text"
                                            name="email"
                                            placeholder="Email"
                                            value={employeeData.email}
                                            onChange={handleInputChange}
                                        />
                                    </td>
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
                                </tr>

                                {/* Second row: Skillset, Role, and Status */}
                                <tr>
                                    <td>
                                    <div className="form-field"> 
                                        <label>Skillset</label>
                                        <select name="skillset" value={employeeData.skillset} onChange={handleInputChange}>
                                            <option value="">Select skillset</option>
                                            <option value="Frontend">Frontend</option>
                                            <option value="Backend">Backend</option>
                                            <option value="Fullstack">Fullstack</option>
                                            <option value="DevOps">DevOps</option>
                                        </select>
                                        </div>
                                    </td>
                                    
                                    <td>
                                    <div className="form-field"> 
                                        <label>Role</label>
                                        <select name="role" value={employeeData.role} onChange={handleInputChange}>
                                            <option value="">Select role</option>
                                            <option value="Admin">Admin</option>
                                            <option value="Manager">Manager</option>
                                            <option value="Employee">Employee</option>
                                            <option value="Intern">Intern</option>
                                        </select>
                                        </div>
                                    </td>
                                    <td>
                                    <div className="form-field"> 
                                        <label>Status</label>
                                        <select name="status" value={employeeData.status} onChange={handleInputChange}>
                                            <option value="Active">Active</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                        </div>
                                    </td>
                                </tr>

                                {/* Submit button */}
                                <tr>
                                    <td colSpan={3}>
                                        <div className="buttonContainer">
                                            <SubmitButton onClick={handleSubmit} text={buttonText} />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateAccount;
