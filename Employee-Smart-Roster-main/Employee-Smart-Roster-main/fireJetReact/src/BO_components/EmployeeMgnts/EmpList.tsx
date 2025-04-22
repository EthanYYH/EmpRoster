import { useAuth } from '../../AuthContext';
import { useEffect, useState } from 'react';
import { useAlert } from '../../components/PromptAlert/AlertContext';
import { IS_ACC_SUSPENDED, PASS_TYPE } from '../../controller/Variables';
import EmployeeMgntController from '../../controller/BOEmpMgntProfile/EmployeeMgntController';
import BOUserList_t from './EmpTableList_t';
import BOUserList_m from './EmpTableList_m';

import '../../pages/UserManagement/UserMgts.css';
import "../../../public/styles/common.css";

interface EMPListProps {
    empUsers: any;
    roles: any;
    skillsets: any;
}

const { handleFilterEmpAccStatus, 
        handleFilterRole, 
        handleFilterSkill,
        handleFilterPassType,
        handleFilterNricOName } = EmployeeMgntController

const EmpList = ({empUsers, roles, skillsets}: EMPListProps) => {
  // console.log(empUsers)
  const { showAlert } = useAlert();

  // Explicitly type state as an array of User objects.
  const [ allUsers, setAllUsers ] = useState<any>(empUsers);
  const [ filteredUsers, setFilteredUsers ] = useState<any>([]);
  const [ filterAccStatus, setFilterAccStatus ] = useState<string>('Activated');
  const [ filterRole, setFilterRole ] = useState<any>("All");
  const [ filterSkill, setFilterSkill ] = useState<any>("All");
  const [ filterNameOnric, setFilterNameOnric ] = useState<string>("");
  const [ filterPassType, setFilterPassType ] = useState<any>("All");

  // Update filtering logic (this filters based on fullName).
  const triggerFilterUsers = () => {
    try {
      let filtered = allUsers;
      filtered = handleFilterEmpAccStatus(allUsers, filterAccStatus);

      if(filterRole !== 'All') {
        // Find roleID for filter
        const findFilterRoleID = roles.filter((role:any) => {
          return role.roleName === filterRole
        })
        // console.log("Filtered role", findFilterRoleID)
        filtered = handleFilterRole(filtered, findFilterRoleID[0].roleID)
      }

      if(filterSkill !== 'All') {
        // Find roleID for filter
        const findFilterSkillID = skillsets.filter((skillset:any) => {
          return skillset.skillSetName === filterSkill
        })
        // console.log("Filtered skill", findFilterSkillID)
        filtered = handleFilterSkill(filtered, findFilterSkillID[0].skillSetID)
      }

      if(filterPassType !== 'All')
        filtered = handleFilterPassType(filtered, filterPassType)
      
      filtered = handleFilterNricOName(filtered, filterNameOnric)

      // console.log("Filtered User: ", filtered)
      setFilteredUsers(filtered);
    } catch (err) {
      setFilteredUsers([]);
      showAlert("Filtering Users", "Filter error", `${err}`, { type: 'error' });
    }
  };
  
  // Re-run the employee lists when employee data updated
  useEffect(() => {
    setAllUsers(empUsers);
    triggerFilterUsers();
  }, [empUsers]);
  
  // Re-run filtering when source data or filter values change.
  useEffect(() => {
    triggerFilterUsers();
  }, [allUsers, 
      filterAccStatus, 
      filterRole, 
      filterSkill, 
      filterPassType,
      filterNameOnric]);

  // Callback to update a single user in state after an update (e.g., suspension).
  const handleUserUpdate = (updatedUser: any) => {
    // console.log(updatedUser)
    const updatedItem = allUsers.map((data:any) => 
      data.user_id === updatedUser.user_id
      ? updatedUser
      : data
    )
    setAllUsers(updatedItem);
  };

  return (
    <>
      <div className="App-filter-search-component">
          <div className="App-filter-container subscription-status">
              <p className='App-filter-title'>Role</p>
              {/* Role dropdown */}
              <select 
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
              >
                <option value="All">ALL</option>
                {roles.map((role:any) => (
                  <option key={role.roleID} value={role.roleName}>
                    {role.roleName}
                  </option>
                ))}
              </select>
          </div>
          <div className="App-filter-container subscription-status">
              <p className='App-filter-title'>Skillset</p>
              {/* Skillset dropdown */}
              <select 
                  value={filterSkill}
                  onChange={(e) => setFilterSkill(e.target.value)}
              >
                <option value="All">ALL</option>
                {skillsets.map((skill:any) => (
                  <option key={skill.skillSetID} value={skill.skillSetName}>
                    {skill.skillSetName}
                  </option>
                ))}
              </select>
          </div>
          <div className="App-filter-container subscription-status">
              <p className='App-filter-title'>Reg. Pass Type</p>
              {/* Skillset dropdown */}
              <select 
                  value={filterPassType}
                  onChange={(e) => setFilterPassType(e.target.value)}
              >
                <option value="All">ALL</option>
                {PASS_TYPE.map((pass:any) => (
                  <option key={pass} value={pass}>
                    {pass}
                  </option>
                ))}
              </select>
          </div>
          <div className="App-filter-container uen-company-name">
              <p className='App-filter-title'>Pass ID/Employee Name</p>
              <input type='text' 
                  className='search-input'
                  placeholder='Search Pass ID/Name' 
                  onChange={(e) => setFilterNameOnric(e.target.value)}
              />
          </div>
          <div className="App-filter-container account-status">
              <p className='App-filter-title'>Account Status</p>
              {/* Account Status dropdown */}
              <select 
                  value={filterAccStatus}
                  onChange={(e) => setFilterAccStatus(e.target.value)}
              >
              {IS_ACC_SUSPENDED.map(accStatus => (
                  <option key={accStatus} value={accStatus}>
                      {accStatus}
                  </option>
              ))}
              </select>
          </div>
      </div>
      {(filteredUsers.length > 0 
        && roles.length > 0 
        && skillsets.length > 0) 
        ? (<>
          {/* Desktop Table */}
          <BOUserList_t 
            users={filteredUsers}
            roles={roles} 
            skillsets={skillsets}
            onEmpUpdate={handleUserUpdate} 
          />

          {/* Tablet and Mobile Table */}
          <BOUserList_m 
            users={filteredUsers} 
            roles={roles} 
            skillsets={skillsets}
            onEmpUpdate={handleUserUpdate} 
          />
        </>
      ):(<>No Data Matched with Filter</>)}
    </>
  );
};

export default EmpList;
