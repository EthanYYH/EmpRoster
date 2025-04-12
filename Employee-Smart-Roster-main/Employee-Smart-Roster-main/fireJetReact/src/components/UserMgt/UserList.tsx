import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BiSolidUserDetail } from "../../../public/Icons.js";
import { useAlert } from '../../components/PromptAlert/AlertContext';
import UserController from '../../controller/User/UserController';
import UserDetail from './UserDetail';
import BOUserList from '../../SA_components/BOUserMgts/UserList';
import './UserList.css';
import '../../../public/styles/common.css';

// Access the function from UserController
const { handleFilterRole, } = UserController;
const UserType = ['Business Owner', 'System Admin', 'Employee']

const UserList = ({users = [], currentUser = [], onDataUpdate}: UserListProps) => {
    const navigate = useNavigate();
    const [ selectedSubsStatus, setSelectedSubsStatus ] = useState('Subscribed');
    const [ selectedAccStatus, setSelectedAccStatus ] = useState('Activated');
    const [ searchedInput, setSearchedInput ] = useState('Subscribed');
    const [ selectedUserDetail, setSelectedUserDetail ] = useState<string | null>(null);
    const [ selectedCompanyDetail, setSelectedCompanyDetail ] = useState<string | null>(null);
    // Use the following
    // console.log(users)
    // console.log("currentUser", currentUser);
    const { showAlert } = useAlert();
    const [ businessOwners, setBusinessOwners ] = useState<any>([]);
    const [ employee, setEmployee ] = useState<any>([]);
    const [ showDetail, setShowDetail ] = useState(false);
    const [ error, setError ] = useState("");

    const handleDefaultDisplay = async () => {
        // console.log("handleDefaultDisplay")
        try{
            // If current user role is 'System Admin'
            if(currentUser?.role === UserType[1]){
                const filter = handleFilterRole(users, UserType[0]); // Filter Business Owner
                setBusinessOwners(Array.isArray(filter) ? filter : []);
            }
            // If current user role is 'Business Owner'
            if(currentUser?.role === UserType[0]){
                const filter = handleFilterRole(users, UserType[2]); // Filter Employee
                setEmployee(Array.isArray(filter) ? filter : []);
            }
        } catch (error) {
            setError(`${error}`)
            setEmployee([]);
            setBusinessOwners([]);
        }

        if(error)
            showAlert(
                "handleDefaultDisplay in UserList",
                "Fetch data error",
                error,
                { type: 'error' }
            )
    }
    // Auto trigger when businessOwners / employee length changed
    useEffect(() => { handleDefaultDisplay(); }, [businessOwners.length])
    // useEffect(() => { console.log(businessOwners); }, [businessOwners.length])

    const handleDetailClick = (request: any) => {
        const data = JSON.stringify(request);
        // Check for mobile screen (adjust breakpoint as needed)
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
          // Mobile: Navigate to detail in page
          navigate('/user-detail', { 
            state: { 
                userDetail: data, 
                // Add componey state when doing full state
            } 
          });
        } else {
          // Desktop/Tablet: Show detail in popup
          setSelectedUserDetail(data);
          setShowDetail(true);
        }
    };

    const handleCloseDetail = () => {
        setSelectedUserDetail("");
        setShowDetail(false);
        return false;
    }

    return (
        <div id='loadUser' className='UserList'>
            <div className="filter-search">
                <div className="filter-group">
                    <div className="subscription-status">
                        <p className='filter-title'>Subscription Status</p>
                        {/* Subscription Status dropdown */}
                        <div className="dropdown-container">
                            <select 
                                value={selectedSubsStatus}
                                onChange={(e) => setSelectedSubsStatus(e.target.value)}
                            >
                            <option value="Subscribed">Subscribed</option>
                            <option value="Unsubscribed">Unsubscribed</option>
                            <option value="Cancelled Subs">Cancelled Subs</option>
                            </select>
                        </div>
                    </div>
                    <div className="account-status">
                        <p className='filter-title'>Account Status</p>
                        {/* Account Status dropdown */}
                        <div className="dropdown-container">
                            <select 
                                value={selectedAccStatus}
                                onChange={(e) => setSelectedAccStatus(e.target.value)}
                            >
                                <option value="Activated" className='dropdown-option'>Activated</option>
                                <option value="Suspended" className='dropdown-option'>Suspended</option>
                            </select>
                        </div>
                </div>

                </div>
                <div className="uen-company-name">
                    <p className='filter-title'>UEN/Comapany Name</p>
                    <input type='text' 
                        className='search-input'
                        placeholder='Search UEN / Company Name' 
                        onChange={(e) => setSearchedInput(e.target.value)}
                    />
                </div>
            </div>
            {/* Desktop Table Header */}
            {/* {currentUser?.role === 'System Admin' && (
            <BOUserList 
                boUsers={businessOwners} 
                onDataUpdate={onDataUpdate} 
            />)} */}
            
            {/* {data.map((user, index) => (
            <div key={user.id}> */}
                {/* Tablet and Mobile */}
                {/* <div className="user-detail-mobile">
                    <div className="user-detail-name">
                        <h2>
                            {user.name}
                        </h2>
                        <button 
                            className="user-detail-detail" 
                            onClick={() => handleDetailClick({user})}>
                            <BiSolidUserDetail />
                        </button>
                    </div>
                    <div className="user-detail-data">
                        {user.role === "Business Owner" && (
                        <div className="bo-details">
                            <div className="uen">
                                <p className="App-secondary-text uen-title">UEN</p>
                                <p>{user.uen}</p>
                            </div>

                            <div className="sub-status">
                                <p className="App-secondary-text sub-status-title">Subs. Status</p>
                                <p>{user.subsStatus}</p>
                            </div>
                        </div>
                        )}

                        {user.role === "Employee" && (
                            <div className="emp-detail">
                                <div className="email">
                                    <p className="App-secondary-text email-title">Email</p>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            ))} */}

            {/* {showDetail && selectedUserDetail && (
                <div className="App-popup">
                    <UserDetail 
                        userDetail = {selectedUserDetail}
                        companyDetail = {selectedCompanyDetail}
                        onClose={(() => handleCloseDetail())}
                    />
                </div>
            )} */}
        </div>
    );
}

interface UserListProps {
    users?: any;
    currentUser?: any;
    onDataUpdate?: (updatedData: any) => void;
}

export default UserList;