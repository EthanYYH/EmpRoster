import { useState, useEffect } from "react";
import "../../../../public/styles/common.css";
import Nav from "../../../components/NavBar/NavBar";
import SideMenu from "../../../components/SideMenu/BOSide";
import EditButton from "../../../components/PrimaryButton/PrimaryButton"; 
import SubmitButton from "../../../components/SecondaryButton/SecondaryButton";
import { useAlert } from "../../../components/PromptAlert/AlertContext"; 
import ViewEmployeeList from "../../../controller/ViewEmployeeListController";
import { EditEmployee } from "../../../controller/EditEmployeeDetailController";
import "./ViewEmployeeDetail.css";

type Employee = {
  user_id: number;
  fullName: string;
  email: string;
  hpNo: string;
  resStatusPassType: string;
  jobTitle: string;
  roles: string;
  standardWrkHrs: string;
  skillsets: string;
  noOfLeave: string;
  noOfLeaveAvailable: string;
  noOfMC: string;
  noOfMCAvailable: string;
  startWorkTime: string;
  endWorkTime: string;
  daysOfWork: string;
  activeOrInactive: string;
};

type SimpleEmployee = {
  user_id: number;
  fullName: string;
  email: string;
  hpNo: number;
  resStatusPassType: string;
  jobTitle: string;
  roles: string;
  standardWrkHrs: number | null;
  skillsets: string;
  noOfLeave: number | null;
  noOfLeaveAvailable: number | null;
  noOfMC: number | null;
  noOfMCAvailable: number | null;
  startWorkTime: string;
  endWorkTime: string;
  daysOfWork: number;
  activeOrInactive: number;
};

const ViewEmployeeDetail = () => {
  const [editMode, setEditMode] = useState(false);

  // Initialize employee state with empty/default values; these will be filled by fetched data.
  const [employee, setEmployee] = useState<Employee>({
    user_id: 4,
    fullName: "",
    email: "",
    hpNo: "",
    resStatusPassType: "",
    jobTitle: "",
    roles: "",
    standardWrkHrs: "",
    skillsets: "",
    noOfLeave: "",
    noOfLeaveAvailable: "",
    noOfMC: "",
    noOfMCAvailable: "",
    startWorkTime: "",
    endWorkTime: "",
    daysOfWork: "",
    activeOrInactive: "",
  });

  // State to hold the list of employees for the picklist
  const [employeeList, setEmployeeList] = useState<SimpleEmployee[]>([]);

  const { showAlert } = useAlert();

  // Fetch the employee list on component mount
  useEffect(() => {
    const business_owner_id = 2; // Set as needed
    const fetchEmployees = async () => {
      try {
        const data = await ViewEmployeeList(business_owner_id);
        console.log("Fetched employee list:", data);
        setEmployeeList(data);
        if (data.length > 0) {
          const firstEmployee = data[0];
          setEmployee({
            user_id: firstEmployee.user_id,
            fullName: firstEmployee.fullName,
            email: firstEmployee.email,
            hpNo: firstEmployee.hpNo.toString(),
            resStatusPassType: firstEmployee.resStatusPassType,
            jobTitle: firstEmployee.jobTitle,
            roles: firstEmployee.roles,
            standardWrkHrs: firstEmployee.standardWrkHrs !== null ? firstEmployee.standardWrkHrs.toString() : "",
            skillsets: firstEmployee.skillsets,
            noOfLeave: firstEmployee.noOfLeave !== null ? firstEmployee.noOfLeave.toString() : "",
            noOfLeaveAvailable: firstEmployee.noOfLeaveAvailable !== null ? firstEmployee.noOfLeaveAvailable.toString() : "",
            noOfMC: firstEmployee.noOfMC !== null ? firstEmployee.noOfMC.toString() : "",
            noOfMCAvailable: firstEmployee.noOfMCAvailable !== null ? firstEmployee.noOfMCAvailable.toString() : "",
            startWorkTime: firstEmployee.startWorkTime,
            endWorkTime: firstEmployee.endWorkTime,
            daysOfWork: firstEmployee.daysOfWork.toString(),
            activeOrInactive: firstEmployee.activeOrInactive.toString(),
          });
        }
      } catch (error) {
        console.error("Error fetching employee list:", error);
      }
    };
    fetchEmployees();
  }, []);

  // Generic handler for input fields (other than the picklist)
  const handleChange = (field: keyof Employee, value: string) => {
    setEmployee((prev) => ({ ...prev, [field]: value }));
  };

  // Specific handler for the fullName picklist
  const handleNameChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedName = e.target.value;
    const matched = employeeList.find((emp) => emp.fullName === selectedName);
    if (matched) {
      setEmployee({
        user_id: matched.user_id,
        fullName: matched.fullName,
        email: matched.email,
        hpNo: matched.hpNo.toString(),
        resStatusPassType: matched.resStatusPassType,
        jobTitle: matched.jobTitle,
        roles: matched.roles,
        standardWrkHrs: matched.standardWrkHrs !== null ? matched.standardWrkHrs.toString() : "",
        skillsets: matched.skillsets,
        noOfLeave: matched.noOfLeave !== null ? matched.noOfLeave.toString() : "",
        noOfLeaveAvailable: matched.noOfLeaveAvailable !== null ? matched.noOfLeaveAvailable.toString() : "",
        noOfMC: matched.noOfMC !== null ? matched.noOfMC.toString() : "",
        noOfMCAvailable: matched.noOfMCAvailable !== null ? matched.noOfMCAvailable.toString() : "",
        startWorkTime: matched.startWorkTime,
        endWorkTime: matched.endWorkTime,
        daysOfWork: matched.daysOfWork.toString(),
        activeOrInactive: matched.activeOrInactive.toString(),
      });
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  // On submit, call the edit API to update employee details.
  const handleSubmitClick = async () => {
    // Prepare updated employee data for the API, converting numeric fields appropriately
    const updatedEmployee = {
      business_owner_id: 2,
      user_id: employee.user_id,
      email: employee.email,
      hpNo: parseInt(employee.hpNo),
      resStatusPassType: employee.resStatusPassType,
      jobTitle: employee.jobTitle,
      roleID: 2, // assuming roleID remains fixed or selected separately
      standardWrkHrs: parseInt(employee.standardWrkHrs),
      skillSetID: 1, // assuming skillSetID remains fixed or selected separately
      noOfLeave: parseInt(employee.noOfLeave),
      noOfLeaveAvailable: parseInt(employee.noOfLeaveAvailable),
      noOfMC: parseInt(employee.noOfMC),
      noOfMCAvailable: parseInt(employee.noOfMCAvailable),
      startWorkTime: employee.startWorkTime,
      endWorkTime: employee.endWorkTime,
      daysOfWork: parseInt(employee.daysOfWork),
      activeOrInactive: parseInt(employee.activeOrInactive),
    };

    const result = await EditEmployee(updatedEmployee);

    if (result) {
      showAlert(
        `Employee details for ${employee.fullName} have been updated`,
        "The employee information has been successfully updated.",
        "Update Success",
        { type: "success" }
      );
      setEditMode(false);
    } else {
      showAlert(
        "Failed to update employee",
        "There was an error updating the employee details. Please try again.",
        "Update Failed",
        { type: "error" }
      );
    }
  };

  const headerMap: { [key in keyof Employee]?: string } = {
    fullName: "Name",
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
      <Nav />
      {/* <SideMenu /> */}
      <div className="viewProfileContent">
        <h2>Employee Detail</h2>
        <table className="employeeDetailTable">
          <tbody>
            {Object.entries(employee).map(([key, value]) => {
              if (key === "user_id") return null;
              const typedKey = key as keyof Employee;
              return (
                <tr key={typedKey}>
                  <th>{headerMap[typedKey] || typedKey}</th>
                  <td>
                    {typedKey === "fullName" ? (
                      <select
                        value={value as string}
                        onChange={handleNameChange}
                        className="full-width"
                      >
                        {employeeList.map((emp) => (
                          <option key={emp.user_id} value={emp.fullName}>
                            {emp.fullName}
                          </option>
                        ))}
                      </select>
                    ) : editMode ? (
                      <input
                        type="text"
                        value={value as string}
                        onChange={(e) => handleChange(typedKey, e.target.value)}
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

export default ViewEmployeeDetail;
