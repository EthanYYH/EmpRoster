import { useState, useEffect } from 'react';
import { useAlert  } from '../../../components/PromptAlert/AlertContext';
import PrimaryButton from '../../../components/PrimaryButton/PrimaryButton';
import SecondaryButton from '../../../components/SecondaryButton/SecondaryButton';
import TimelineController from '../../../controller/TimelineController.js';
import { IoClose, CgProfile, TbTarget,
         TbTargetArrow, FaRegListAlt, VscDebugBreakpointData,
         HiMiniViewfinderCircle, TiTime } from '../../../../public/Icons.js';

import './EventDetail.css'
import '../../../../public/styles/common.css'

interface EventDetailProps {
    task?: any;
    onUpdate?: (updatedData: any) => void;
    onDelete?: (deletedTaskId: number) => void;
    onClose?: () => void;
}

const { boGetTaskDetail, deleteTaskDetail } = TimelineController;

const EventDetail = ({task = [], onUpdate, onDelete, onClose}: EventDetailProps) => {
    const { showAlert } = useAlert()
    const [ taskDetail, setTaskDetail ] = useState<any>([])
    const [ showDeleteTask, setShowDeleteTask ] = useState(false)

    const fetchTaskDetail = async () => {
        try {
            let taskDetail = await boGetTaskDetail(task.taskID);
            taskDetail = taskDetail.taskDetails
            
            // Convert task allocated time to Singapore time
            const allocatedTime = new Date(taskDetail[0].createdOn);
            allocatedTime.setHours(allocatedTime.getHours() - 2);
            taskDetail[0].createdOn = new Date(allocatedTime).toISOString().split('T');
            
            // Convert task start time to Singapore time
            const startTime = new Date(taskDetail[0].startDate);
            startTime.setHours(startTime.getHours() - 2);
            taskDetail[0].startDate = new Date(startTime).toISOString().split('T');
            
            // Convert task start time to Singapore time
            const endTime = new Date(taskDetail[0].endDate);
            endTime.setHours(startTime.getHours() - 2);
            taskDetail[0].endDate = new Date(endTime).toISOString().split('T');

            // console.log(taskDetail[0])
            setTaskDetail(taskDetail[0]);
        } catch (error) {
            showAlert(
                "fetchRegisReqsData",
                "Fetch data error",
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    };

    useEffect(() => { fetchTaskDetail() }, [task])
    // useEffect(() => { console.log(taskDetail) }, [task])

    function toggleShowDelete () {
        if (showDeleteTask === false)
            setShowDeleteTask(true)
        else
            setShowDeleteTask(false)
    }

    const triggerDeleteTask = async() => {
        try {
            const response = await deleteTaskDetail(taskDetail.taskID);
            
            showAlert(
                `${taskDetail.title}`,
                "",
                `${response.message}`,
                { type: 'success' }
            )

            // Pass delete detail
            if(onDelete)
                onDelete(taskDetail.taskID)

            // Close task detail
            if(onClose)
                onClose()

        } catch(error) {
            showAlert(
                "confirmDeleteTask",
                `${taskDetail.title} Failed to Delete`,
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    }

    if (showDeleteTask) return (
        <div className="App-popup" onClick={toggleShowDelete}>
            <div className='App-popup-prompt-content' onClick={(e) => e.stopPropagation()}>
                <p className='App-prompt-confirmation-title App-header'>Confirm to Delete the Task Detail for:</p>
                <p className="App-prompt-confirmation-title-highlighted-text">{taskDetail.title}</p>
                
                <div className="btns-grp">
                    <PrimaryButton 
                        text='Confirm'
                        onClick={() => triggerDeleteTask()}
                    />
                    <SecondaryButton 
                        text='Cancel'
                        onClick={() => toggleShowDelete()}
                    />
                </div>
            </div>
        </div>
    )

    return(
        <div className='App-popup-content' onClick={(e) => e.stopPropagation()}>
            <div className="App-header">
                <h1>{taskDetail.title}</h1>
                <IoClose className='icons' onClick={onClose}/>
            </div>
            
            <div className="event-button-group">
                <PrimaryButton 
                    text='Edit Task'
                />
                <SecondaryButton 
                    text='Delete Task'
                    onClick={() => toggleShowDelete()}
                />
            </div>
        </div>
    )
}

export default EventDetail