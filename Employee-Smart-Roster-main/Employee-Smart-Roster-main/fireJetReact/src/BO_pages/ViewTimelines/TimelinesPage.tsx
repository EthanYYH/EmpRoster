import { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import TimelineController from '../../controller/TimelineController'
import MonthCalendar from '../../components/Timelines/MonthCalendar'
import BOSide from '../../components/SideMenu/BOSide';

import './TimelinesPage.css'
import '../../../public/styles/common.css'

<<<<<<< HEAD
const { getTimelines, getTaskDetail } = TimelineController
=======
const { getTimelines } = TimelineController
>>>>>>> 137fa90da682af594a11dfe3b5eefdfba6eb6c51

const BOTimelinesPage = () => {
    const { user } = useAuth();
    // console.log("BOTimelinesPage: \n", user)
    const { showAlert } = useAlert();
    const [ allTasks, setAllTasks ] = useState<any>([]);

    const fetchTasksData = async () => {
        try {
            let data = await getTimelines(user?.UID)
            data = data.sortedTimeline;
            // console.log(data)

            setAllTasks(Array.isArray(data) ? data : []);

        } catch(error) {
            showAlert(
                "fetchTasksData",
                "Fetch data error",
<<<<<<< HEAD
                `${error}`,
=======
                error instanceof Error ? error.message : String(error),
>>>>>>> 137fa90da682af594a11dfe3b5eefdfba6eb6c51
                { type: 'error' }
            )
        }
    }
    // Auto trigger when allRegisRequest length change
    useEffect(() => { 
        fetchTasksData();
    }, [allTasks.length]); 

<<<<<<< HEAD
=======
    
    const handleDeleteTask = async (taskID: number) => {
        // console.log(taskID)
        setAllTasks((prev:any) => 
            prev.filter((task:any) => 
                task.taskID !== taskID
        ));
    }


>>>>>>> 137fa90da682af594a11dfe3b5eefdfba6eb6c51
    return (
        <div className="App-content">
            <BOSide />
            {/* BO Side Menu here */}
            <div className="content">
                <h1>Timeline Management</h1>
<<<<<<< HEAD
                <MonthCalendar tasks={allTasks} />
=======
                <MonthCalendar 
                    tasks={allTasks} 
                    onDelete={handleDeleteTask}
                />
>>>>>>> 137fa90da682af594a11dfe3b5eefdfba6eb6c51
            </div>
        </div>
    )
}

export default BOTimelinesPage