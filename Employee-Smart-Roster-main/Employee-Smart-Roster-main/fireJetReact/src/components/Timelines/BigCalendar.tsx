import React, { useMemo, useState } from 'react';
import moment from 'moment';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import EventDetail from './TaskDetail/EventDetail';
import { TASK_STATUS } from '../../controller/Variables.js';
import { FaChevronCircleLeft, FaChevronCircleRight } from '../../../public/Icons.js'

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './TimelineCalendar.css';
import '../../../public/styles/common.css';

const mLocalizer = momentLocalizer(moment);
interface ContinuousCalendarProps {
  tasks: any[];
  onUpdate?: (updatedData: any) => void;
  onDelete?: (deletedTaskId: number) => void;
  onClick?: (_day:number, _month: number, _year: number) => void;
}
const MonthCalendar: React.FC<ContinuousCalendarProps> = ({ 
  tasks=[], 
  onUpdate,
  onDelete,
  onClick }) => {
  // console.log(tasks)
  const defaultDate = new Date();
  const [ selectedTask, setSelectedTask ] = useState<any[]>([]);
  const [ showTaskDetail, setShowTaskDetail ] = useState(false);
  

  const events = useMemo(() => (
    tasks.map(task => ({
      ...task,
      title: task.title,
      start: new Date(task.startDate),
      end: new Date(task.endDate),
      allDay: true // Set to true if these are all-day events
    }))
  ), [tasks]);

  function triggerSelectedTask(task: any[]) {
      setSelectedTask(task);
      setShowTaskDetail(true);
  }

  function triggerCloseSelectedTask() {
      setSelectedTask([]);
      setShowTaskDetail(false);
  }

  // Custom toolbar component
  const CustomToolbar = (toolbar: any) => {
    return (
      <div className="rbc-toolbar">
        <span className="rbc-btn-group">
          <button onClick={() => toolbar.onNavigate('TODAY')}>Today</button>
        </span>
        
        <span className="rbc-btn-group">
          <button className='icon-button'
            onClick={() => toolbar.onNavigate('PREV')}>
            <FaChevronCircleLeft />
          </button>
          <span className="rbc-toolbar-label"><strong>{toolbar.label}</strong></span>
          <button  className='icon-button'
            onClick={() => toolbar.onNavigate('NEXT')}>
            <FaChevronCircleRight />
          </button>
        </span>
        
        <span className="rbc-btn-group">
          <button 
            className={toolbar.view === Views.MONTH ? 'rbc-active' : ''}
            onClick={() => toolbar.onView(Views.MONTH)}
          >
            Month
          </button>
          <button 
            className={toolbar.view === Views.WEEK ? 'rbc-active' : ''}
            onClick={() => toolbar.onView(Views.WEEK)}
          >
            Week
          </button>
          <button 
            className={toolbar.view === Views.DAY ? 'rbc-active' : ''}
            onClick={() => toolbar.onView(Views.DAY)}
          >
            Day
          </button>
          <button 
            className={toolbar.view === Views.AGENDA ? 'rbc-active' : ''}
            onClick={() => toolbar.onView(Views.AGENDA)}
          >
            Agenda
          </button>
        </span>
      </div>
    );
  };

  // Custom event component
  const Event = ({ event }: any) => {
    return (
      <div className="custom-event">
        <strong>{event.title}</strong>
        {event.fullName && <div className="event-resource">{event.fullName}</div>}
      </div>
    );
  };

  const CustomComponents: any = {
    toolbar: CustomToolbar,
    event: Event,
  }

  const { views } = useMemo(() => ({
      views: {
        month: true,
        week: true,
        day: true,
        agenda: true,
      },
    }), []
  );

  return (
    <div className="timeline-management-container">
      <div className="calendar-container">
        <Calendar
          localizer={mLocalizer}
          backgroundEvents={events}
          startAccessor="start"
          endAccessor="end"
          defaultDate={defaultDate}
          views={views}
          defaultView={Views.MONTH}
          components={CustomComponents}
          onSelectEvent={triggerSelectedTask}
          eventPropGetter={(event: any) => ({
              className: `event-style ${
                          event.status === TASK_STATUS[1] ? 'in-progress' :
                          event.status === TASK_STATUS[2] ? 'completed' :
                          ''
                        }`
          })}
          doShowMoreDrillDown={false}
        />
      </div>

      {showTaskDetail && selectedTask && (
          <EventDetail 
              task={selectedTask}
              onDelete={onDelete}
              onClose={() => triggerCloseSelectedTask()}
          />
      )}
    </div>
  );
};

export default MonthCalendar;