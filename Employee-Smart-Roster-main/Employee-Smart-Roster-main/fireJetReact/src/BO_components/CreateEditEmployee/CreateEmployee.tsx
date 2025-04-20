import { useEffect, useState, useRef } from "react";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../components/PromptAlert/AlertContext"; 
import { formatPhoneNumber, formatNRIC, PASS_TYPE,
         FIRST_3_MIN_MC, MIN_YEAR1_ANNUAL } from '../../controller/Variables.js';
import CompanyController from "../../controller/CompanyController";
import CreateEmployeeController from "../../controller/CreateEmployeeController";
import UserController from '../../controller/User/UserController';
import PwRule from "../../pages/RegistrationNLogin/PwRule";
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";

import { FaPlusCircle, IoClose, GoAlertFill, TiTick } from '../../../public/Icons.js'
import "./CreateNEditEmp.css"
import "../../../public/styles/common.css";

interface CreateOrEditEmpProps {
    isCreate: boolean;
    defaultValues: any;
    onEmpUpdate?: (updatedEmpData: any) => void;
}

const { validateEmail, validatePhoneNo, validateNRICofFIN } = UserController;
const { getCompanyRoles, getCompanySkillsets } = CompanyController;

const CreateAccount = ({isCreate, defaultValues, onEmpUpdate}: CreateOrEditEmpProps) => {
    const { user } = useAuth();
    const [ allRoles, setAllRoles ] = useState<any>([]);
    const [ allSkillsets, setAllSkillsets ] = useState<any>([]);
    const [ isPopupOpen, setIsPopupOpen ] = useState(false);
    const [ employeeData, setEmployeeData ] = useState({
        email: '',
        nric: '',
        hpNo: '',
        fullName: '',
        resStatusPassType: '',
        jobTitle: '',
        roleID: '',
        skillSetID: '',
        startWorkTime: '',
        endWorkTime: '',
        daysOfWork: '',
        noOfLeave: '',
        noOfMC: ''
    });
    const [ errors, setErrors ] = useState<{ 
        email?: string; 
        nricOfin?: string; 
        hpNo?:string;
    }>({})

    const fetchRolesNSkillsets = async() => {
        try {
            // Fetch Roles
            let roles = await getCompanyRoles(user?.UID);
            roles = roles.roleName
            // console.log(roles)
            setAllRoles(roles)

            // Fetch Skillsets
            let skillsets = await getCompanySkillsets(user?.UID);
            skillsets = skillsets.skillSets
            // console.log(skillsets)
            setAllSkillsets(skillsets)
        } catch (error) {
            showAlert(
                "fetchRolesNSkillsets",
                "Fetch Roles or Skillsets error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    }
    // Auto trigger when the user's UID changed
    useEffect(() => { fetchRolesNSkillsets() }, [user?.UID])

    const { showAlert } = useAlert();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === 'hpNo'){
            const formattedPhoneNumber = formatPhoneNumber(value)
            setEmployeeData((prevData) => ({
                ...prevData,
                hpNo: formattedPhoneNumber,
            }));
        } else if (name === 'nric'){
            const formattedNRIC = formatNRIC(value)
            setEmployeeData((prevData) => ({
                ...prevData,
                nric: formattedNRIC,
            }));
        } else if (name === 'roleID' || name === 'skillSetID'){
            setEmployeeData((prevData) => ({
                ...prevData,
                [name]: String(value),
            }));
        } else {
            setEmployeeData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };
    useEffect(() => {
        console.log(employeeData)
    }, [employeeData])

    const triggerEmailValidation = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // Store email value
        const email = event.target.value
        handleInputChange(event)

        const error = validateEmail(email)
        setErrors(prev => ({
            ...prev,
            email: error
        }))
    }

    const triggerPhoneValidation = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // Format the phone number with spaces
        const formattedNumber = formatPhoneNumber(event.target.value);
        handleInputChange(event)

        const error = validatePhoneNo(formattedNumber)
        setErrors(prev => ({
            ...prev,
            hpNo: error
        }))
    }
    
    const triggerNricOFinValidation = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        // Format the nric
        const formattedNRIC = formatNRIC(event.target.value);
        handleInputChange(event)

        const error = validateNRICofFIN(formattedNRIC)
        setErrors(prev => ({
            ...prev,
            nric: error
        }))
    }

    // Check if create/edit employee form
    const isFormIncomplete = () => {
        const requiredFields: (keyof typeof employeeData)[] = [
            'fullName',
            'email',
            'nric',
            'hpNo',
            'resStatusPassType',
            'jobTitle',
            'roleID',
            'skillSetID',
            'startWorkTime',
            'endWorkTime',
            'daysOfWork'
          ];
      
        return requiredFields.some(field => !employeeData[field]);
      };

    const handleSubmit = async () => {
        console.log("Submitted Employee Data:", employeeData);

        const requestData = {
            business_owner_id: 2,
            email: "test@test.com",
            hpNo: 91234567,
            resStatusPassType: "Work Permit",
            jobTitle: "Test Title",
            roleID: 3,
            standardWrkHrs: 10,
            skillSetID: 3,
            noOfLeave: 10,
            noOfLeaveAvailable: 5,
            noOfMC: 5,
            noOfMCAvailable: 4,
            startWorkTime: "10:00:00",
            endWorkTime: "12:00:00",
            daysOfWork: 6,
            activeOrInactive: 1,
        };

        try {
            const response = await CreateEmployeeController.createEmployee(requestData);
            console.log(response);

            showAlert(
                `Employee Account Created`, 
                "The employee account has been created successfully.", 
                "Account Created", 
                { type: "success" }
            );

            setIsPopupOpen(false);
            console.log("Employee created successfully:", response);
        } catch (error) {
            console.error("Error creating employee:", error);
            showAlert("Error", "There was an error creating the employee account.", "Error", { type: "error" });
        }
    };

    return (
        <>
            <FaPlusCircle onClick={() => setIsPopupOpen(true)} className="create-new-emp-icon" />

            {isPopupOpen && (
                <div className="App-popup" onClick={() => setIsPopupOpen(false)}>
                    <div className="App-popup-content create-edit-emp-content" onClick={(e) => e.stopPropagation()}>
                        <div className='App-header'>
                            <h1>Create Account</h1>
                            <button className='icons' onClick={() => setIsPopupOpen(false)}>
                                <IoClose />
                            </button>
                        </div>

                        <div className="create-employee-form">
                            <div className="create-emp-left">
                                {/* Input Employee Name */}
                                <div className='forms-input'>
                                    <strong>
                                        Name <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    <div className="fields">
                                        <input type='text' 
                                            name='fullName'
                                            placeholder='Employee Name' 
                                            value={employeeData.fullName}
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Input Email */}
                                <div className='forms-input'>
                                    <strong>
                                        Employee Email <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    <div className="fields">
                                        <input type='email' 
                                            name='email'
                                            value={employeeData.email}
                                            placeholder='Enter Employee Email' 
                                            onChange={(e) => triggerEmailValidation(e)}
                                            required
                                        />
                                        {errors.email && (
                                            <span className='error-message'>
                                                <GoAlertFill />
                                                <span className='error-message-text'>{errors.email}</span>
                                            </span>
                                        )}
                                        {!errors.email && employeeData.email && (
                                            <span className='valid-message'>
                                                <TiTick className='valid-icon'/>
                                                <span>Valid Email</span>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* Input HpNo */}
                                <div className='forms-input'>
                                    <strong>
                                        H/P No <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    <div className="fields">
                                        <input type='tel' 
                                            name='hpNo'
                                            placeholder='Pesornal Contact No' 
                                            value={employeeData.hpNo}
                                            onChange={(e) => triggerPhoneValidation(e)}
                                            // onBlur={() => handlePhoneInput(hpNo)}
                                            required
                                        />
                                        {errors.hpNo && (
                                            <span className='error-message'>
                                                <GoAlertFill /> 
                                                <span className='error-message-text'>{errors.hpNo}</span>
                                            </span>
                                        )}
                                        {!errors.hpNo && employeeData.hpNo && (
                                            <span className='valid-message'>
                                                <TiTick className='valid-icon'/>Valid Phone Number
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* NRIC */}
                                <div className='forms-input'>
                                    <strong>
                                        NRIC/FIN <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    <div className="fields">
                                        <input type='text'
                                            name='nric'
                                            placeholder='NRIC' 
                                            value={employeeData.nric}
                                            onChange={(e) => triggerNricOFinValidation(e)}
                                            required
                                        />
                                        {errors.nricOfin && (
                                            <span className='error-message'>
                                                <GoAlertFill /> 
                                                <span className='error-message-text'>{employeeData.nric}</span>
                                            </span>
                                        )}
                                        {!errors.nricOfin && employeeData.nric && (
                                            <span className='valid-message'>
                                                <TiTick className='valid-icon'/>Valid NRIC/FIN Format
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {/* Radio Button: Registered pass type */}
                                <div className="radio-button-group">
                                    <strong>
                                        Reg. Pass Type <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    {PASS_TYPE.map((passType:string) => (
                                        <label className="App-radio-option" key={passType}>
                                            {passType}
                                            <input 
                                                type='radio'
                                                name='resStatusPassType'
                                                value={passType} // use the passType as value
                                                checked={employeeData.resStatusPassType === passType}
                                                onChange={(e) => handleInputChange(e)}
                                                required
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    ))}
                                </div>
                                {/* Role */}
                                <div className='forms-input'>
                                    <strong>
                                        Role <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    {/* Role dropdown */}
                                    <select 
                                        name="roleID"
                                        value={employeeData.roleID}
                                        onChange={(e) => handleInputChange(e)}
                                    >
                                        {allRoles.map((role:any) => (
                                        <option key={role.roleID} value={role.roleName}>
                                            {role.roleName}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="create-emp-right">
                                {/* Input Employee Name */}
                                <div className='forms-input'>
                                    <strong>
                                        Job Title <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    <div className="fields">
                                        <input type='text' 
                                            name='jobTitle'
                                            placeholder='Job Title' 
                                            value={employeeData.jobTitle}
                                            onChange={(e) => handleInputChange(e)}
                                            required
                                        />
                                    </div>
                                </div>
                                {/* Skillsets */}
                                <div className='forms-input'>
                                    <strong>
                                        Skillsets <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    {/* Skillsets dropdown */}
                                    <select 
                                        name="skillSetID"
                                        value={employeeData.skillSetID}
                                        onChange={(e) => handleInputChange(e)}
                                    >
                                        {allSkillsets.map((skill:any) => (
                                        <option key={skill.skillSetID} value={skill.skillSetName}>
                                            {skill.skillSetName}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                {/* Start Working Time */}
                                <div className='forms-input'>
                                    <strong>
                                        Start Working Time <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    <input type='time'
                                        name='startWorkTime'
                                        value={employeeData.startWorkTime}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    />
                                </div>
                                {/* End Working Time */}
                                <div className='forms-input'>
                                    <strong>
                                        End Working Time <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    <input type='time'
                                        name='endWorkTime'
                                        value={employeeData.endWorkTime}
                                        onChange={(e) => handleInputChange(e)}
                                        required
                                    />
                                </div>
                                {/* Days Of Work */}
                                <div className='forms-input'>
                                    <strong>
                                        No. of Working Days <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    <input type='number'
                                        name='daysOfWork'
                                        value={employeeData.daysOfWork}
                                        onChange={(e) => handleInputChange(e)}
                                        min="1"
                                        max="7"
                                        required
                                    />
                                </div>
                                {/* No. of Annual Leave */}
                                <div className='forms-input'>
                                    <strong>
                                        No. of Annual Leave <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    <input type='number'
                                        name='noOfLeave'
                                        value={employeeData.noOfLeave}
                                        onChange={(e) => handleInputChange(e)}
                                        min={MIN_YEAR1_ANNUAL}
                                        required
                                    />
                                </div>
                                {/* No. of MC */}
                                <div className='forms-input'>
                                    <strong>
                                        No. of Annual Leave <span style={{ color: 'red' }}>*</span>
                                    </strong>
                                    <input type='number'
                                        name='noOfMC'
                                        value={employeeData.noOfMC}
                                        onChange={(e) => handleInputChange(e)}
                                        min={FIRST_3_MIN_MC}
                                        required
                                    />
                                </div>
                                <div className="create-edit-emp-button">
                                    <PrimaryButton 
                                        text="Create Employee"
                                        disabled= {isFormIncomplete()}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default CreateAccount;
