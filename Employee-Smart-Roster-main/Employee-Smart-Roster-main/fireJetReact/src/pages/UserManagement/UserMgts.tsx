import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { useAlert } from '../../components/PromptAlert/AlertContext';
import UserController from '../../controller/User/UserController';
import BOSide from '../../components/SideMenu/BOSide';
// Import the updated list components that use UserDetail for detailed info
import BOUserList_t from '../../BO_components/EmployeeMgnts/BOUserList_t';
import BOUserList_m from '../../BO_components/EmployeeMgnts/BOUserList_m';

import './UserMgts.css';
import "../../../public/styles/common.css";

// Import functions from UserController
const { getUsers, handleFilterRole } = UserController;

// ADJUSTABLE: Modify available user types for filtering as needed
const AvailableUserTypes = ['Business Owner', 'Employee'];

const UserMgts = () => {
  const { showAlert } = useAlert();
  const { user } = useAuth();

  // State to hold all users and the filtered list
  const [allUsers, setAllUsers] = useState<any>([]);
  const [filteredUsers, setFilteredUsers] = useState<any>([]);
  
  // ADJUSTABLE: Default filter values
  const [filterUserType, setFilterUserType] = useState("Business Owner");
  const [filterName, setFilterName] = useState("");
  const [error, setError] = useState("");

  // Fetch user data from the controller
  const fetchUsersData = async () => {
    try {
      const response = getUsers();
      setAllUsers(Array.isArray(response) ? response : []);
    } catch (err) {
      setError(`${err}`);
      setAllUsers([]);
      showAlert("UserMgts page", '', `${err}`, { type: 'error' });
    }
  };

  // Fetch users when component mounts
  useEffect(() => {
    fetchUsersData();
  }, []);

  // ADJUSTABLE: Update filtering logic as needed
  const triggerFilterUsers = () => {
    try {
      let filtered = handleFilterRole(allUsers, filterUserType);
      if (filterName.trim() !== "") {
        filtered = filtered.filter((u: any) =>
          u.fullName.toLowerCase().includes(filterName.toLowerCase())
        );
      }
      setFilteredUsers(filtered);
    } catch (err) {
      setError(`${err}`);
      setFilteredUsers([]);
      showAlert("Filtering Users", "Filter error", `${err}`, { type: 'error' });
    }
  };

  // Re-run filtering when source data or filter values change
  useEffect(() => {
    triggerFilterUsers();
  }, [allUsers, filterUserType, filterName]);

  // *** FIX: Add an onUpdate callback to update the parent's state ***
  const handleUserUpdate = (updatedUser: any) => {
    setAllUsers((prevUsers: any[]) =>
      prevUsers.map(user =>
        user.UID === updatedUser.UID ? updatedUser : user
      )
    );
  };

  return (
    <div className="UserMgts">
      <BOSide />
      <div className="content">
        <h1>User Management</h1>
        <div className="App-filter-search-component">
          <div className="App-filter-container">
            <p className="App-filter-title">User Type</p>
            <select
              value={filterUserType}
              onChange={(e) => setFilterUserType(e.target.value)}
            >
              {AvailableUserTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          <div className="App-filter-container">
            <p className="App-filter-title">Search Name</p>
            <input
              type="text"
              placeholder="Search by name"
              onChange={(e) => setFilterName(e.target.value)}
            />
          </div>
        </div>

        {filteredUsers.length === 0 ? (
          <div>Loading users...</div>
        ) : (
          <>
            {/* Pass the onUpdate callback so that when a user is updated (e.g., suspended),
                the parent's state is updated */}
            <div className="desktop-view">
              <BOUserList_t users={filteredUsers} onUpdate={handleUserUpdate} />
            </div>
            <div className="mobile-view">
              <BOUserList_m users={filteredUsers} onUpdate={handleUserUpdate} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserMgts;
