import {startOfMonth, endOfMonth, startOfWeek, endOfWeek, format, addDays, subDays, addWeeks } from 'date-fns';

interface CalendarProps {
    dateParams: {
        month: Date;
    };
}

export default function CalendarDays({ dateParams } : CalendarProps) {
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let monthStart = startOfMonth(dateParams.month);
    let startDate = startOfWeek(monthStart);
    const rows = [];
    let days = [];
    let count = 0;

    while (count <= 4 ) {
        days = [];
        let firstDayOfWeek = addWeeks(startDate, count);
        for (let i = 0; i < 7 ; i++ ) {
            let day = addDays(firstDayOfWeek, i);
            let className = 'day';

            if(day.getMonth() != monthStart.getMonth()) {
                className = 'day-gray'
            }

            days.push(
                <span className={className} id={date[i]} key={date[i]}>{day.getDate()}</span>
            )
        }
        rows.push(
            <div key={count}>
                <div className='weeks'>{days}</div>
            </div>
        );
        count++;
    }

    return <div>{rows}</div>
}