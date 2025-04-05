// AddEmployee.jsx
import React, { useState } from 'react';
import EmployeeController from '../../../controller/AccCreationController';

export default function AddEmployee() {
    const [formData, setFormData] = useState({
        business_owner_id: 2,
        user_id: 4,
        email: "employee2new@example.com",
        hpNo: 90002222,
        resStatusPassType: "Work Permit",
        jobTitle: "Manager of the beaunite group",
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

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        try {
            const result = await EmployeeController.createEmployee(formData);
            console.log("Success:", result);
            alert("Employee created successfully!");
        } catch (error) {
            alert("Failed to create employee.");
        }
    };

    return (
        <div>
            <h2>Create Employee</h2>
            <form onSubmit={handleSubmit}>
                <button type="submit">Create</button>
            </form>
        </div>
    );
}
