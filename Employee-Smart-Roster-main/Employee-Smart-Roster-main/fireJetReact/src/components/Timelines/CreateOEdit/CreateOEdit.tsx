import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAlert } from "../../../components/PromptAlert/AlertContext";
import { useAuth } from "../../../AuthContext";
import { generateSGDateTimeForDateTimeInput } from "../../../controller/Variables";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import CreateEditTask from "./TaskForm";
import CompanyController from "../../../controller/CompanyController";

import "./CreateNEditTask.css"
import "../../../../public/styles/common.css"

interface TaskProps {
    isCreate: boolean;
    selectedTask?: any;
    onTaskAdd?: (newTask: any) => void;
    onTaskUpdate?: (updateTask: any) => void;
}

const { getCompanyRoles, getCompanySkillsets } = CompanyController;

const CreateOEditTask = ({
    isCreate, selectedTask, onTaskAdd, onTaskUpdate
} : TaskProps) => {
    const { user } = useAuth();
    const { showAlert } = useAlert();
    const navigate = useNavigate();
    const [ allRoles, setAllRoles ] = useState<any>([]);
    const [ allSkillsets, setAllSkillsets ] = useState<any>([]);
    const location = useLocation();
    const navState = location.state as {
        defaultValues?: any;
        defaultTimelineValues?: any;
        allRoles?: any[];
        allSkillsets?: any[];
    };
    const [ createTaskValues, setCreateTaskValues ] = useState({
        title: '0405Create Task',
        taskDescription: '0405 wm testing on Create Task',
        roleID: '',
        skillSetID: '',
        startDate: generateSGDateTimeForDateTimeInput(new Date()),
        endDate: generateSGDateTimeForDateTimeInput(new Date()),
        noOfEmp: 1
    });
    const [ createTimelineValues, setCreateTimelineValues ] = useState({
        timelineID: '',
        title: '0405',
        timeLineDescription: '0405_WM Create Timeline Test',
    })

    const fetchRolesNSkillsets = async() => {
        try {
            // Fetch Roles
            let roles = await getCompanyRoles(user?.UID);
            roles = roles.roleName
            // console.log(roles)
            setAllRoles(Array.isArray(roles) ? roles : [])

            // Fetch Skillsets
            let skillsets = await getCompanySkillsets(user?.UID);
            skillsets = skillsets.skillSets
            // console.log(skillsets)
            setAllSkillsets(Array.isArray(skillsets) ? skillsets : [])
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

    useEffect(() => {
        if (allRoles.length > 0 && allSkillsets.length > 0) {
            setCreateTaskValues((prev) => ({
                ...prev,
                roleID: allRoles[0].roleName,
                skillSetID: allSkillsets[0].skillSetName
            }));
        }
    }, [allRoles, allSkillsets]);

    function toggleShowTaskForm (){
        if(isCreate)
            navigate('/create-new-task', {
                state: {
                    defaultValues: createTaskValues,
                    defaultTimelineValues: createTimelineValues,
                    allRoles,
                    allSkillsets
                }
            })

        if(!isCreate)
            navigate('/edit-task', {
                state: {
                    defaultValues: selectedTask,
                    allRoles,
                    allSkillsets
                }
            })
    }

    // Create new task
    if (isCreate && navState && allRoles && allSkillsets) {
        return (
            <CreateEditTask
                isCreate={true}
                bo_UID={user?.UID}
                defaultTaskValues={navState.defaultValues}
                defaultTimelineValues={navState.defaultTimelineValues}
                allRoles={navState.allRoles}
                allSkillsets={navState.allSkillsets}
                onTaskAdd={onTaskAdd}
            />
        );
    }
    return (
        <>
        {isCreate ? (
            <PrimaryButton 
                text='Create New Task'
                onClick={() => toggleShowTaskForm()}
            />
        ):(
            <></>
        )}
        </>
    )
}

export default CreateOEditTask