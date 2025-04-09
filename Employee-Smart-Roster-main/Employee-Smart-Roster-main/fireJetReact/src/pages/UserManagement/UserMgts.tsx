import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { useAlert } from '../../components/PromptAlert/AlertContext';
import UserController from '../../controller/User/UserController';
import BOSide from '../../components/SideMenu/BOSide';
import BOUserList_t from '../../BO_components/EmployeeMgnts/BOUserList_t';
import BOUserList_m from '../../BO_components/EmployeeMgnts/BOUserList_m';

import './UserMgts.css';
import "../../../public/styles/common.css";

const AvailableUserTypes = ['Business Owner', 'Employee'];

const UserMgts = () => {
  const { showAlert } = useAlert();
  const { user } = useAuth();

  // Explicitly type state as an array of User objects.
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  
  const [filterUserType, setFilterUserType] = useState("Employee");
  const [filterName, setFilterName] = useState("");
  const [error, setError] = useState("");

  // Fetch user data from the controller.
  // If filterUserType is "Employee", call getEmployeeUsers API; otherwise, use the static getUsers.
  const fetchUsersData = async () => {
    try {
      let response;
      if (filterUserType === "Employee") {
        // Guard: Ensure that 'user' exists and has a UID; this UID acts as business_owner_id.
        if (!user?.UID) return;
        response = await UserController.getEmployeeUsers(user.UID);
      } else {
        response = await UserController.getUsers();
      }
      console.log("Fetched response:", response);
      setAllUsers(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Error in fetchUsersData:", err);
      setError(`${err}`);
      setAllUsers([]);
      showAlert("UserMgts page", '', `${err}`, { type: 'error' });
    }
  };

  // Fetch users when the component mounts or when filterUserType changes and when user is defined.
  useEffect(() => {
    if (user) {
      fetchUsersData();
    }
  }, [filterUserType, user]);

  // Update filtering logic (this filters based on fullName).
  const triggerFilterUsers = () => {
    try {
      let filtered = UserController.handleFilterRole(allUsers, filterUserType);
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

  // Re-run filtering when source data or filter values change.
  useEffect(() => {
    triggerFilterUsers();
  }, [allUsers, filterUserType, filterName]);

  // Callback to update a single user in state after an update (e.g., suspension).
  const handleUserUpdate = (updatedUser: any) => {
    setAllUsers((prevUsers: any[]) =>
      prevUsers.map((user) =>
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
