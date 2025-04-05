import React, { useState } from "react";
import fetchEmployeeList from "../../../controller/ViewEmployeeListController";
import EmployeeController from "../../../controller/AccCreationController";

interface Employee {
  email: string;
  hpNo: number;
  jobTitle: string;
  roles: string;
  activeOrInactive: number;
}

const TestEmployeeManager = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const sampleEmployee = {
    business_owner_id: 2,
    user_id: Math.floor(Math.random() * 10000),
    email: email || "test@example.com",
    hpNo: 91234567,
    resStatusPassType: "Work Permit",
    jobTitle: "Test Job Title",
    roles: "Test Role",
    standardWrkHrs: 8,
    skillsets: "JavaScript, React",
    noOfLeave: 10,
    noOfLeaveAvailable: 10,
    noOfMC: 5,
    noOfMCAvailable: 5,
    startWorkTime: "09:00:00",
    endWorkTime: "18:00:00",
    daysOfWork: 5,
    activeOrInactive: 1,
  };

  const handleCreateEmployee = async () => {
    try {
      setMessage("Creating employee...");
      await EmployeeController.createEmployee(sampleEmployee);
      setMessage("Employee created successfully!");
    } catch (err) {
      setMessage("Failed to create employee.");
    }
  };

  const handleFetchEmployees = async () => {
    setMessage("Fetching employee list...");
    const data = await fetchEmployeeList(2);
    setEmployeeList(data);
    setMessage(`Fetched ${data.length} employees.`);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h2>🚀 Test Employee Manager</h2>

      <input
        type="email"
        placeholder="Employee Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem" }}
      />

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={handleCreateEmployee} style={{ marginRight: "1rem" }}>
          ➕ Create Employee
        </button>
        <button onClick={handleFetchEmployees}>📥 Fetch Employees</button>
      </div>

      <p>{message}</p>

      {employeeList.length > 0 && (
        <table border={1} cellPadding={8} style={{ marginTop: "1rem" }}>
          <thead>
            <tr>
              <th>Email</th>
              <th>HP No</th>
              <th>Job Title</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {employeeList.map((emp, idx) => (
              <tr key={idx}>
                <td>{emp.email}</td>
                <td>{emp.hpNo}</td>
                <td>{emp.jobTitle}</td>
                <td>{emp.roles}</td>
                <td>{emp.activeOrInactive === 1 ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TestEmployeeManager;
