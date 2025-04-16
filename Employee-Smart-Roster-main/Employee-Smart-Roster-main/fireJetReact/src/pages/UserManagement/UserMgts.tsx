import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { useAlert } from '../../components/PromptAlert/AlertContext';
import { USER_ROLE } from '../../controller/Variables.js';
import UserController from '../../controller/User/UserController';
import EmpList from '../../BO_components/EmployeeMgnts/EmpList';
import BOUserList from '../../SA_components/BOUserMgts/UserList';
import EmployeeMgntController from '../../controller/BOEmpMgntProfile/EmployeeMgntController.js';

import './UserMgts.css'
import "../../../public/styles/common.css"


// Import functions needed from UserController
const { getBOUsers } = UserController
const { getEmployeeList } = EmployeeMgntController

const UserMgts = () => {
    const { showAlert } = useAlert()
    const { user } = useAuth();
    const [ bizOwners, setBizOwners ] = useState<any>([]);
    const [ employees, setEmployees ] = useState<any>([]);
    const [ error, setError ] = useState("")

    const fetchBoUsersData = async () => {
        try{
            let data = await getBOUsers();
            data = data.BOList || [];
            // console.log(boList)
            setBizOwners(Array.isArray(data) ? data : []);
        } catch(error) {
            showAlert(
                "fetchBoUsersData",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    }

    const fetchEmpUsersData = async () => {
        try{
            let data = await getEmployeeList(user?.UID);
            data = data.employeeList || [];
            // console.log(data)
            setEmployees(Array.isArray(data) ? data : []);
        } catch(error) {
            showAlert(
                "fetchEmpUsersData",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    }

    useEffect(() => {
        if(user?.role === USER_ROLE[0])
            fetchBoUsersData();

        else if(user?.role === USER_ROLE[1])
            fetchEmpUsersData();

        else return;
    }, [user])

    return (
        <div className='App-content'>
            {/* Display side menu base on user role */}
            {user?.role === USER_ROLE[0] && (
            <>
              <div className="content">
                <h1>Business Owner Management</h1>
                {bizOwners.length === 0 ? (
                    <div>Loading user list...</div>
                ) : (
                    <BOUserList boUsers={bizOwners} />
                )}
              </div>
            </>
            )}

            {user?.role === USER_ROLE[1] && (
            <>
              <div className="content">
                <h1>My Employee</h1>
                {bizOwners.length === 0 ? (
                    <div>Loading your employee list...</div>
                ) : (
                    <EmpList empUsers={employees} />
                )}
              </div>
            </>
            )}
        </div>
    );
    
}

export default UserMgts;