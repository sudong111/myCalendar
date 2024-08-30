import {startOfMonth, startOfWeek, addDays, addWeeks } from 'date-fns';

interface CalendarProps {
    dateParams: {
        month: Date;
        anniversary: Array<String>;
        holidays: Array<String>;
    };
}

export default function CalendarDays({ dateParams } : CalendarProps) {
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let monthStart = startOfMonth(dateParams.month);
    let startDate = startOfWeek(monthStart);
    const rows = [];
    let days = [];
    let count = 0;

    console.log(dateParams.holidays)
    console.log(dateParams.anniversary)

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