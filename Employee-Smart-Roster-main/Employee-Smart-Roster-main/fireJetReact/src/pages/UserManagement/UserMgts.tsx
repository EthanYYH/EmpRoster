import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { useAlert } from '../../components/PromptAlert/AlertContext';
import UserController from '../../controller/User/UserController';
import SASide from '../../components/SideMenu/SASide';
import UserList from '../../components/UserMgt/UserList';
import BOUserList from '../../SA_components/BOUserMgts/UserList';

import './UserMgts.css'
import "../../../public/styles/common.css"

// Import functions needed from UserController
const { getUsers, handleFilterRole } = UserController
const UserType = ['Business Owner', 'System Admin', 'Employee']

const UserMgts = () => {
    const { showAlert } = useAlert()
    const { user } = useAuth();
    const [ allUsers, setAllUsers ] = useState<any>([]);
    const [ bizOwners, setBizOwners ] = useState<any>([]);
    const [ employee, setEmployee ] = useState<any>([]);
    const [ error, setError ] = useState("")

    const fetchUsersData = async () => {
        try {
            const response = getUsers();
            setAllUsers(Array.isArray(response) ? response : []);
        } catch (err) {
            setError(`${err}`);
            setAllUsers([]);
        }

        if(error)
            showAlert(
                "UserMgts page",
                '',
                error,
                { type: 'error' }
            )
    }
    // Auto trigger when allUsers length change
    useEffect(() => { fetchUsersData(); }, [allUsers.length])
    // useEffect(() => { console.log(allUsers); }, [allUsers.length])
    
    const filterBizOwner = async () => {
        try {
            const filter = handleFilterRole(allUsers, UserType[0]); // Filter Business Owner
            setBizOwners(Array.isArray(filter) ? filter : []);
        } catch (error) {
            setError(`${error}`)
            setBizOwners([])
        }
        if(error)
            showAlert(
                "filterBizOwner",
                "Fetch data error",
                error,
                { type: 'error' }
            )
    }

    const filterEmployee = async () => {
        try {
            const filter = handleFilterRole(allUsers, UserType[2]); // Filter Business Owner
            setBizOwners(Array.isArray(filter) ? filter : []);
        } catch (error) {
            setError(`${error}`)
            setEmployee([])
        }
        if(error)
            showAlert(
                "filterEmployee",
                "Fetch data error",
                error,
                { type: 'error' }
            )
    }

    // Update user to display when allUsers or user role changes
    useEffect(() => {
        if(user?.role === UserType[1])
            filterBizOwner();
        else if(user?.role == UserType[0])
            filterEmployee();
        else 
            return
    }, [allUsers, user?.role])

    return (
        <div className='user-management'>
            
            {/* Display side menu base on user role */}
            {user?.role === 'System Admin' && (
                <div className="App-content">
                    <SASide />
                    <div className="content">
                        <h1>View All Business Owners</h1>
                        {bizOwners.length === 0 ? (
                            <div>Loading business owners...</div>
                        ) : (
                            <BOUserList boUsers={bizOwners} />
                        )}
                    </div>
                </div>
            )}

            {user?.role === 'Business Owner' && (
                <div className="side-menu">
                    Business Owner Side Menu Here
                </div>)} 
        </div>
    );
    
}

export default UserMgts;