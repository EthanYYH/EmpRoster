import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useAlert } from "../../components/PromptAlert/AlertContext"; 
import { formatPhoneNumber, formatNRIC, PASS_TYPE,
         FIRST_3_MIN_MC, MIN_YEAR1_ANNUAL, formatKey } from '../../controller/Variables.js';
import CreateEmployeeController from "../../controller/CreateEmployeeController";
import UserController from '../../controller/User/UserController';
import PrimaryButton from "../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton/SecondaryButton";

import { IoArrowBack, IoClose, GoAlertFill, TiTick } from '../../../public/Icons.js'
import "./CreateNEditEmp.css"
import "../../../public/styles/common.css";

interface CreateOrEditEmpProps {
    isCreate: boolean;
    defaultValues: any;
    allRoles: any;
    allSkillsets: any;
    onEmpUpdate?: (updatedEmpData: any) => void;
    onClose: () => void
}

const { validateEmail, validatePhoneNo, validateNRICofFIN } = UserController;
const { validateEndWorkTime } = CreateEmployeeController

const CreateAccount = ({isCreate, defaultValues, allRoles, allSkillsets, onEmpUpdate, onClose}: CreateOrEditEmpProps) => {
    // console.log(isCreate)
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [ showConfirmation, setShowConfirmation ] = useState(false);
    const isMobile = window.innerWidth <= 768;
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
        endWorkTime?:string;
    }>({})

    useEffect(() => {
        setEmployeeData(defaultValues)
    }, [defaultValues])


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

    const triggerIsStartTimeBeforeEndTime = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        handleInputChange(event)
        const { startWorkTime, endWorkTime } = employeeData;

        const error = validateEndWorkTime(startWorkTime, endWorkTime)
        setErrors(prev => ({
            ...prev,
            endWorkTime: error
        }))
    };
    

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
    // console.log("isFormIncomplete?", isFormIncomplete(), employeeData);

    const isAllValueValid = () => {
        const validValues: (keyof typeof errors)[] = [
            'email',
            'nricOfin',
            'hpNo',
            'endWorkTime'
        ]

        return validValues.some(field => errors[field]);
    }

    const triggerCreateEmpAcc = async() => {

    }

    // Prompt user confirmation for update
    function toggleConfirmation () {
        setShowConfirmation(!showConfirmation)
    }

    if(showConfirmation) return (
        <div className="App-popup" onClick={toggleConfirmation}>
            <div className="App-popup-prompt-content confirm-user-profile-completion" onClick={(e) => e.stopPropagation()}>
                <h3 className="App-prompt-confirmation-title App-header">
                    Confirm The Employee Information
                </h3>
                <div className="all-create-employee-data">
                    {Object.entries(employeeData).map(([key, value], index) => (
                        <div className={`create-employee-confirmation-detail 
                                        ${index % 2 === 1 ? 'odd-row' : ''}`}>
                            {key === 'roleID' ? ( // If current key is roleID
                                <p className="title">Role</p>
                            ) : key === 'skillSetID' ? ( // If current key is skillSetID
                                <p className="title">Skillset</p>
                            ) : key === 'noOfMC' ? (
                                <p className="title">No Of MC</p>
                            ) : (
                                <p className="title">{formatKey(key)}</p>
                            )}
                            <p className="main-data">{String(value)}</p>
                        </div>
                    ))}
                </div>
                {/* Display values */}
                <div className="btns-grp">
                    <PrimaryButton 
                        text="Confirm" 
                        onClick={() => triggerCreateEmpAcc()}
                    />
                    <SecondaryButton 
                        text="Cancel" 
                        onClick={() => toggleConfirmation()}
                    />
                </div>
            </div>
        </div>
    )

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

            // setIsPopupOpen(false);
            console.log("Employee created successfully:", response);
        } catch (error) {
            console.error("Error creating employee:", error);
            showAlert("Error", "There was an error creating the employee account.", "Error", { type: "error" });
        }
    };

    return (
        <div className={isMobile ? "mobile-create-emp-content" : "App-popup-content create-edit-emp-content"} onClick={(e) => e.stopPropagation()}>
            <div className='App-header'>
                {isMobile ? (
                    <>
                        <IoArrowBack 
                            onClick={() => navigate(-1)}
                            className="icons"
                        />
                        {isCreate ? (
                            <h1>Create New Employee Account</h1>
                        ):(
                            <h1>Edit Employee Information</h1>
                        )}
                    </>
                ) : (
                    <>
                        <h1>Create Account</h1>
                        <IoClose className="icons" onClick={onClose}/>
                    </>
                )}
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
                                placeholder='8123 4567' 
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
                                placeholder='M1234567Y' 
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
                </div>

                <div className="create-emp-right">
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
                            onChange={(e) => triggerIsStartTimeBeforeEndTime(e)}
                            required
                        />
                        {errors.endWorkTime && (
                                <span className='error-message'>
                                    <GoAlertFill /> 
                                    <span className='error-message-text'>{errors.endWorkTime}</span>
                                </span>
                            )}
                        {!errors.endWorkTime && employeeData.endWorkTime && (
                            <span className='valid-message'>
                                <TiTick className='valid-icon'/>Valid End Work Time
                            </span>
                        )}
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
                            No. of Outpatient Leave (MC) <span style={{ color: 'red' }}>*</span>
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
                            disabled= {isFormIncomplete() || !!isAllValueValid()}
                            onClick={() => toggleConfirmation()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
