import React, { useState } from 'react';
import CalendarHeader from './calendar/header';
import CalendarWeek from './calendar/week';
import CalendarDays from './calendar/days'

export default function Calendar() {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [currentDate, setCurrentDate] = useState(new Date());

    const handleChangeMonth = (newMonth: Date) => {
        setCurrentMonth(newMonth);
        setCurrentDate(new Date(newMonth.getFullYear(), newMonth.getMonth(), 1));
    }

    return (
        <div className="calendar">
           <CalendarHeader
               dateParams={
               {month: currentMonth}}
               changedMonth={handleChangeMonth}
           />
            <CalendarWeek />
            <CalendarDays
                dateParams={
                {month: currentMonth}}/>
        </div>
    )
}