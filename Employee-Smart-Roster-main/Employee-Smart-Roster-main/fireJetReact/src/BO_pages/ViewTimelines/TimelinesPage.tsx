import { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext'
import { useAlert } from '../../components/PromptAlert/AlertContext'
import TimelineController from '../../controller/TimelineController'
// import MonthCalendar from '../../components/Timelines/MonthCalendar'
import MonthCalendar from '../../components/Timelines/BigCalendar'
import './TimelinesPage.css'
import '../../../public/styles/common.css'

const { getTimelines } = TimelineController

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
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            )
        }
    }
    // Auto trigger when allRegisRequest length change
    useEffect(() => { 
        fetchTasksData();
    }, [allTasks.length]); 

    function removeDuplicates(arr: any[], key: string): any[] {
        return arr.reduce((unique, item) => {
            if (!unique.find((obj : any) => obj[key] === item[key])) {
                unique.push(item);
            }
            return unique;
        }, []);
    }

    const handleDeleteTask = async (taskID: number) => {
        // console.log(taskID)
        setAllTasks((prev:any) => 
            prev.filter((task:any) => 
                task.taskID !== taskID
        ));
    }
    
    return (
        <div className="App-content">
            {/* BO Side Menu here */}
            <div className="content">
                <h1>Timeline Management</h1>
                <MonthCalendar 
                    tasks={removeDuplicates(allTasks, 'taskID')} 
                    onDelete={handleDeleteTask}
                />
            </div>
        </div>
    )
}

export default BOTimelinesPage