import { useState, useEffect } from 'react'
import { useCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import { createViewDay,
         createViewMonthAgenda,
         createViewMonthGrid,
         createViewWeek, 
        } from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'
import { createEventModalPlugin } from '@schedule-x/event-modal'

import '@schedule-x/theme-default/dist/index.css'
import './index.css'


const Calander = () => {

    const eventModal = createEventModalPlugin()
    const eventsService = useState(() => createEventsServicePlugin())[0]
    const [ selectedEvent, setSelectedEvent ] = useState<any>([])

    const calendar = useCalendarApp({
        views: [
            createViewDay(), 
            createViewWeek(), 
            createViewMonthGrid(), 
            createViewMonthAgenda()
        ],
        events: [
        {
            id: '1',
            title: 'Event 1',
            start: '2025-04-09 00:00',
            end: '2025-04-09 05:00',
            description: 'testing on event',
        },
        ],
        plugins: [
            eventsService,
            eventModal,
        ]
    })
 
    useEffect(() => {
        // get all events
        eventsService.getAll()
    }, [])

    

    return(
        <div>
        <ScheduleXCalendar 
            calendarApp={calendar}
        />
        </div>
    )
}

export default Calander