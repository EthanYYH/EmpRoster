import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../components/PromptAlert/AlertContext";
import { formatKey, formatDateTime } from "../../../controller/Variables";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../components/SecondaryButton/SecondaryButton";
import BOEmployeeController from "../../../controller/BOEmployeeController";
import TimelineController from "../../../controller/TimelineController";

import { IoArrowBack } from '../../../../public/Icons.js'
import "./CreateNEditTask.css"
import "../../../../public/styles/common.css"

interface CreateOEditTaskProps {
    isCreate: boolean;
    bo_UID: any;
    defaultTaskValues: any;
    allRoles: any;
    allSkillsets: any;
    onTaskAdd?: (newTask: any) => void;
    onTaskUpdate?: (updateTask: any) => void;
}

const INPUT_TYPE = ['Task', 'Timeline']
const { getRoleIdForEmp, getSkillIdForEmp } = BOEmployeeController;
const { createTask } = TimelineController;

const CreateEditTask = ({ 
    isCreate, bo_UID, defaultTaskValues,
    allRoles, allSkillsets, onTaskAdd, onTaskUpdate
} : CreateOEditTaskProps) => {
    const navigate = useNavigate();
    const { showAlert } = useAlert();
    const [ showConfirmation, setShowConfirmation ] = useState(false);
    const [ taskValues, setTaskValues ] = useState({
        title: '',
        taskDescription: '',
        roleID: '',
        skillSetID: '',
        startDate: '',
        endDate: ''
    });
    useEffect(() => {
        setTaskValues(defaultTaskValues)
    }, [defaultTaskValues])

    const handleInputChange = (event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >) => {
        const { name, value } = event.target;
        
        setTaskValues((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Check if create/edit form
    const isTaskIncomplete = () => {
        const requiredFields: (keyof typeof taskValues)[] = [
            'title',
            'taskDescription',
            'roleID',
            'skillSetID',
            'startDate',
            'endDate'
        ];
        return requiredFields.some(field => !taskValues[field]);
    };

    // Prompt user confirmation for update
    function toggleConfirmation () {
        setShowConfirmation(!showConfirmation)
    }

    const triggerCreateTask = async() => {
        const roleID = getRoleIdForEmp(allRoles, taskValues.roleID)
        taskValues.roleID = roleID[0].roleID

        const skillSetID = getSkillIdForEmp(allSkillsets, taskValues.skillSetID)
        taskValues.skillSetID = skillSetID[0].skillSetID

        try {
            const response = await createTask (bo_UID, taskValues)
            console.log(response)

            if(response.message === "Task successfully created"){
                showAlert(
                    "Task Created Successfully",
                    `${taskValues.title}`,
                    ``,
                    { type: 'success' }
                );

                if(onTaskAdd)
                    onTaskAdd(taskValues)

                else{
                    toggleConfirmation()
                }
            }
        } catch (error) {
            showAlert(
                "triggerCreateTask",
                `Failed to Create Task for "${taskValues.title}"`,
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            );
        }
    }

    if(showConfirmation) return (
        <div className="App-popup" onClick={toggleConfirmation}>
            <div className="App-popup-prompt-content confirm-create-edit-emp-completion" onClick={(e) => e.stopPropagation()}>
                <h3>
                    {isCreate ? (
                        "Confirm The Task Information"
                    ):("Confirm The Updated Task Information")}  
                </h3>
                <div className="all-create-employee-data">
                    {Object.entries(taskValues).map(([key, value], index) => (
                        <div className={`create-employee-confirmation-detail 
                                        ${index % 2 === 1 ? 'odd-row' : ''}`}>
                            {key === 'roleID' ? ( // If current key is roleID
                                <p className="title">Role</p>
                            ) : key === 'skillSetID' ? ( // If current key is skillSetID
                                <p className="title">Skillset</p>
                            ) : (
                                <p className="title">{formatKey(key)}</p>
                            )}

                            {key === 'startDate' ? (
                                <p className="main-data">
                                    {formatDateTime(String(value))}
                                </p>
                            ) : key === 'endDate' ? (
                                <p className="main-data">
                                    {formatDateTime(String(value))}
                                </p>
                            ) : (
                                <p className="main-data">{String(value)}</p>
                            )}
                        </div>
                    ))}
                </div>
                <div className="btns-grp">
                    {isCreate ? ( // Create new task
                        <PrimaryButton 
                            text="Confirm" 
                            onClick={() => triggerCreateTask()}
                        />
                    ):( // Update task
                        <PrimaryButton 
                            text="Confirm" 
                            // onClick={() => triggerCreateEmpAcc()}
                        />
                    )}
                    <SecondaryButton 
                        text="Cancel" 
                        onClick={() => toggleConfirmation()}
                    />
                </div>
            </div>
        </div>
    )

    return (
        <div className="content create-n-edit-task-page">
            <div className="App-header create-n-edit-task-header">
                <IoArrowBack 
                    className="icons"
                    onClick={() => navigate(-1)}    
                />
                <h2>{isCreate ? "Create New " : "Edit "}Task</h2>
            </div>
            <div className="create-n-edit-task-form-container">
                <div className="create-n-edit-task-form-content">
                    {/* <h3>Timeline Information</h3> */}
                    {/* Input Task Title */}
                    <div className='forms-input'>
                        <strong>
                            Task Title <span style={{ color: 'red' }}>*</span>
                        </strong>
                        <input type='text' 
                            name='title'
                            placeholder='Task Title' 
                            value={taskValues.title}
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                    </div>
                    {/* Input Task Description */}
                    <div className='forms-input'>
                        <strong>
                            Task Description <span style={{ color: 'red' }}>*</span>
                        </strong>
                        <textarea name='taskDescription'
                            rows={4}
                            placeholder='Task Description' 
                            value={taskValues.taskDescription}
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                    </div>
                    {/* Role Needed */}
                    <div className='forms-input'>
                        <strong>
                            Required Role <span style={{ color: 'red' }}>*</span>
                        </strong>
                        <div className="fields">
                            {/* Role dropdown */}
                            <select 
                                name="roleID"
                                value={taskValues.roleID}
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
                    {/* Skillsets Needed */}
                    <div className='forms-input'>
                        <strong>
                            Required Skillsets <span style={{ color: 'red' }}>*</span>
                        </strong>
                        {/* Skillsets dropdown */}
                        <select 
                            name="skillSetID"
                            value={taskValues.skillSetID}
                            onChange={(e) => handleInputChange(e)}
                        >
                            {allSkillsets.map((skill:any) => (
                            <option key={skill.skillSetID} value={skill.skillSetName}>
                                {skill.skillSetName}
                            </option>
                            ))}
                        </select>
                    </div>
                    {/* Task Start */}
                    <div className='forms-input'>
                        <strong>
                            Start Date Time <span style={{ color: 'red' }}>*</span>
                        </strong>
                        <input type='datetime-local' 
                            name='startDate'
                            placeholder='Task Description' 
                            value={taskValues.startDate}
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                    </div>
                    {/* Task End */}
                    <div className='forms-input'>
                        <strong>
                            End Date Time <span style={{ color: 'red' }}>*</span>
                        </strong>
                        <input type='datetime-local' 
                            name='endDate'
                            placeholder='Task Description' 
                            value={taskValues.endDate}
                            onChange={(e) => handleInputChange(e)}
                            required
                        />
                    </div>
                    <div className="create-task-button">
                        <PrimaryButton 
                            text="Create Task"
                            onClick={() => toggleConfirmation()}
                            disabled={isTaskIncomplete()}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEditTask