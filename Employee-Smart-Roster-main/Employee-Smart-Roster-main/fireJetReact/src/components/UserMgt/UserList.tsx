import Header from '../../components/table/Header';
import Cell from '../../components/table/Cell';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { BiSolidUserDetail } from "../../../public/Icons.js";
import UserDetail from './UserDetail';
import UserController from '../../controller/User/UserController';
import './UserList.css';
import '../../../public/styles/common.css';

// Access the function from the default export
const { GetUsers } = UserController;

const UserList = ({currentUser = ""}: UserListProps) => {
    const navigate = useNavigate();
    // console.log(currentUser);
    const [ selectedSubsStatus, setSelectedSubsStatus ] = useState('Subscribed');
    const [ selectedAccStatus, setSelectedAccStatus ] = useState('Activated');
    const [ searchedInput, setSearchedInput ] = useState('Subscribed');
    const [ data, setData ] = useState<any[]>([]);
    const [ selectedUserDetail, setSelectedUserDetail ] = useState<string | null>(null);
    const [ selectedCompanyDetail, setSelectedCompanyDetail ] = useState<string | null>(null);
    const [ showDetail, setShowDetail ] = useState(false);
    const [ error, setError ] = useState("");

    function getUser() {
        return GetUsers();
    }

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

    const displayUser = () => {
        // console.log(GetUsers())
        const allData = getUser();

        try{
            if(currentUser?.role === 'System Admin')
                filterDisplay(allData, 'Business Owner');
            else 
                filterDisplay(allData, 'Employee');

        } catch(err) {
            setError( err instanceof Error 
                ? err.message 
                : typeof err === 'string' 
                    ? err 
                    : 'An unknown error occurred');
            
        }
    }

    function filterDisplay (allData: any, filterby: String) {
        // console.log(allData)
        const filteredData = allData.filter((e:any) => {
            // console.log(e)
            return e.role === filterby
        })
        setData(filteredData);
        // console.log(data);
    }

    // Call function displayUser() when component loaded
    useEffect(() => {displayUser();}, [])

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
                                className="status-dropdown"
                            >
                            <option value="Subscribed" className='dropdown-option'>Subscribed</option>
                            <option value="Unsubscribed" className='dropdown-option'>Unsubscribed</option>
                            <option value="Cancelled Subs" className='dropdown-option'>Cancelled Subs</option>
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
                                className="status-dropdown"
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
            <div className="desktop-table">
                <div className="desktop-table-header">
                    <Header className='header-uen' text='UEN' />
                    <Header className='header-company-name' text='COMPANY NAME' />
                    <Header className='header-subs-status' text='Subscription Status' />
                    <Header className='header-gap' text=''/>
                </div>
                {data.map((user, index) => (
                <div key={user.id}>
                    {/* Desktop View */}
                    <div className="user-detail">
                        <Cell className='body-uen' text={user.uen} />
                        <Cell className='body-company-name' text={user.company} />
                        <Cell className='body-subs-status' text={user.subsStatus} />
                        <button 
                            className="user-detail-detail-table" 
                            onClick={() => handleDetailClick({user})}>
                            <BiSolidUserDetail />
                        </button>
                    </div>
                </div>
                ))}
            </div>
            
            {data.map((user, index) => (
            <div key={user.id}>
                {/* Tablet and Mobile */}
                <div className="user-detail-mobile">
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
            ))}

            {showDetail && selectedUserDetail && (
                <div className="App-popup">
                    <UserDetail 
                        userDetail = {selectedUserDetail}
                        companyDetail = {selectedCompanyDetail}
                        onClose={(() => handleCloseDetail())}
                    />
                </div>
            )}
        </div>
    );
}

interface UserListProps {
    currentUser?: any;
}

export default UserList;