import Nav from "../NavBar/NavBar"
import SideMenu from "../SideMenu/BOSide"
import "../../../public/styles/common.css";
import "./CreateEmployee.css"
import SubmitButton from "../PrimaryButton/PrimaryButton"
import { useEffect, useState } from 'react';


export default function CreateEmployee() {
    const [ searchedInput, setSearchedInput ] = useState('Subscribed');
    return (
      <div className="main-container">
        <Nav/>
        <SideMenu/>
        <div className="logo">EmpRoster</div>

    
<div className="formContainer">
    <table className="createEmployeeTable">
    <tr>
        <th>Name</th>
        <th>Create Account</th>
        <th>Wage</th>
    </tr>
    <tr>
        <td>
        <input type='text' 
                        className='search-input'
                        placeholder='EmployeeName' 
                        onChange={(e) => setSearchedInput(e.target.value)}
                    />
        </td>
        <td>Profile Photo</td>
        <td>Wage Input</td>
    </tr>
    <tr>
        <th>Address</th>
        <th></th>
        <th>Skillset</th>
    </tr>
    <tr>
        <td>Address Input</td>
        <td></td>
        <td>Skillset Input</td>
    </tr>
    
        <tr>
        <th>Email</th>
        <th></th>
        <th>Role</th>
    </tr>
    <tr>
        <td>Email Input</td>
        <td></td>
        <td>Role Input</td>
    </tr>
    
        <tr>
        <th>Working Hours</th>
        <th></th>
        <th>Status</th>
    </tr>
    <tr>
        <td>Working Hours Input</td>
        <td></td>
        <td>Status Input</td>
    </tr>

    <tr>
        <td></td>
        <td>
            <div className="buttonContainer">
                <SubmitButton text="Create Account"/>
            </div>
        </td>
        <td></td>
    </tr>


    </table>
</div>


      </div>
      
    );
  }