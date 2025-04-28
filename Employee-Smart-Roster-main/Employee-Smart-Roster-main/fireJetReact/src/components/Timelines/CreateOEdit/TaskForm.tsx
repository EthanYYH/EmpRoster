import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "../../../components/PromptAlert/AlertContext";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import SecondaryButton from "../../../components/SecondaryButton/SecondaryButton";

import { IoArrowBack } from '../../../../public/Icons.js'
import "./CreateNEditTask.css"
import "../../../../public/styles/common.css"

interface CreateOEditTaskProps {
    isCreate: boolean;
    bo_UID: any;
    defaultTaskValues: any;
    defaultTimelineValues?: any;
    allRoles: any;
    allSkillsets: any;
    onTaskAdd?: (newTask: any) => void;
    onTaskUpdate?: (updateTask: any) => void;
}

const INPUT_TYPE = ['Task', 'Timeline']

const CreateEditTask = ({ 
    isCreate, bo_UID, defaultTaskValues, defaultTimelineValues,
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
        startDate: new Date(),
        endDate: new Date()
    });
    const [ timelineValues, setTimelineValues ] = useState({
        title: '',
        timeLineDescription: '',
    })
    useEffect(() => {
        setTaskValues(defaultTaskValues)
        setTimelineValues(defaultTimelineValues)
    }, [defaultTaskValues, defaultTimelineValues])

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
        type: string
    ) => {
        const { name, value } = event.target;
        
        if(type === INPUT_TYPE[0]) {
            setTaskValues((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        } else {
            setTimelineValues((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
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
    const isTimelineIncomplete = () => {
        const requiredFields: (keyof typeof timelineValues)[] = [
            'title',
            'timeLineDescription'
        ];
        return requiredFields.some(field => !timelineValues[field]);
    };

    // Prompt user confirmation for update
    function toggleConfirmation () {
        setShowConfirmation(!showConfirmation)
    }

    return (
        <div className="content">
            <div className="App-header create-n-edit-task-header">
                <IoArrowBack 
                    className="icons"
                    onClick={() => navigate(-1)}    
                />
                <h2>{isCreate ? "Create New " : "Edit "}Task</h2>
            </div>
            <div className="create-n-edit-task-form-content">
                <h3>Timeline Information</h3>
                {/* Input Project Title */}
                <div className='forms-input'>
                    <strong>
                        Project Title <span style={{ color: 'red' }}>*</span>
                    </strong>
                    <div className="fields">
                        <input type='text' 
                            name='title'
                            placeholder='Project Title' 
                            value={timelineValues.title}
                            onChange={(e) => handleInputChange(e, INPUT_TYPE[1])}
                            required
                        />
                    </div>
                </div>
                {/* Input Project Description */}
                <div className='forms-input'>
                    <strong>
                        Project Description <span style={{ color: 'red' }}>*</span>
                    </strong>
                    <div className="fields">
                        <input type='text' 
                            name='timeLineDescription'
                            placeholder='Project Description' 
                            value={timelineValues.timeLineDescription}
                            onChange={(e) => handleInputChange(e, INPUT_TYPE[1])}
                            required
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEditTask