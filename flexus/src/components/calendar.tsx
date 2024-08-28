import React, { useState } from 'react';
import CalendarHeader from './calendar/calendar-header';

export default function Calendar() {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());

    return (
        <div className="calendar">
           <CalendarHeader
           dateParams={
               {month: currentMonth}}/>
            <div>Days</div>
            <div>Cells</div>
        </div>
    )
}