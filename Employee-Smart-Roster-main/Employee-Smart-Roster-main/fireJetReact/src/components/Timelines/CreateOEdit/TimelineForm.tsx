import { useState, useEffect } from "react";
import { useAlert } from "../../../components/PromptAlert/AlertContext";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import TimelineController from "../../../controller/TimelineController";

import './CreateNEditTask.css'
import '../../../../public/styles/common.css'

interface TimelineFormProps {
    defaultValues: any;
    bo_UID: any;
    newTimelineValue: (newValus: any) => void;
}

const { createNewTimeline, getTimelines, getTimelineSelected } = TimelineController

const TimelineForm = ({ defaultValues, bo_UID, newTimelineValue }: TimelineFormProps) => {
    // console.log(bo_UID)
    const { showAlert } = useAlert()
    const [ allTimelines, setAllTimelines ] = useState<any>([])
    const [ timelineValue, setTimelineValues ] = useState({
        timelineID: '',
        title: '',
        timeLineDescription: '',
    })
    useEffect(() => {
        setTimelineValues(defaultValues)
    }, [defaultValues])

    const handleInputChange = (event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >) => {
        const { name, value } = event.target;
        setTimelineValues((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectedTimeline = (timelineID: any) => {
        // console.log(timelineID)
        const timelineMatch = getTimelineSelected(allTimelines, timelineID)
        console.log(timelineMatch)
        // timelineValue.timeLineDescription = timelineMatch.timeLineDescription
        // timelineValue.title = timelineMatch.title
        // timelineValue.timelineID = timelineMatch.timelineID
    }

    const triggerFetchAllTimelines = async() => {
        try {
            let response = await getTimelines(bo_UID);
            if (response.message === 'Timeline retrieved successfully.'){
                response = response.timeline || [];
                // console.log(response)
                setAllTimelines(response)
            }
            
        } catch(error) {
            showAlert(
                "triggerFetchAllTimelines",
                `Failed to Fetch All Timelines`,
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            );
        }
    }
    useEffect(() => {triggerFetchAllTimelines()}, [defaultValues, bo_UID])

    const triggerCreateTimeline = async() => {
        try {
            const response = await createNewTimeline (bo_UID, timelineValue)
            // console.log(response)
            // Return: message, timelineID
            if(response.message === 'Timeline created successfully') {
                const newData = {
                    ...timelineValue,
                    timelineID: response.timelineID
                }
                // console.log(newData)
                if(newTimelineValue)
                    newTimelineValue(newData)
            }
        } catch(error) {
            showAlert(
                "triggerCreateTimeline",
                `Failed to Create Timeline for "${timelineValue.title}"`,
                error instanceof Error ? error.message : String(error),
                { type: 'error' }
            );
        }
    }

    return (
        <div className="timeline-creation-form card">
            {/* Available Timeline */}
            <div className='forms-input'>
                <strong>
                    Select Available Timeline
                </strong>
                <div className="fields">
                    {/* Role dropdown */}
                    <select 
                        name="timelineValue"
                        value={timelineValue.title}
                        onChange={(e) => handleSelectedTimeline(e.target.value)}
                    >
                        {allTimelines.map((timeline:any) => (
                        <option key={timeline.timeLineID} value={timeline.timeLineID}>
                            {timeline.title}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
            {/* Input Timeline Title */}
            <div className='forms-input'>
                <strong>
                    Timeline Title <span style={{ color: 'red' }}>*</span>
                </strong>
                <input type='text' 
                    name='title'
                    placeholder='Timeline Title' 
                    value={timelineValue.title}
                    onChange={(e) => handleInputChange(e)}
                    required
                />
            </div>
            {/* Input Task Description */}
            <div className='forms-input'>
                <strong>
                    Timeline Description <span style={{ color: 'red' }}>*</span>
                </strong>
                <textarea name='timeLineDescription'
                    rows={4}
                    placeholder='Timeline Description' 
                    value={timelineValue.timeLineDescription}
                    onChange={(e) => handleInputChange(e)}
                    required
                />
            </div>
            <PrimaryButton 
                text="Create Timeline"
                disabled={!timelineValue.title
                          || !timelineValue.timeLineDescription}
                onClick={() => triggerCreateTimeline()}
            />
        </div>
    )
}

export default TimelineForm