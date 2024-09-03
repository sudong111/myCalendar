import {startOfMonth, startOfWeek, addDays, addWeeks } from 'date-fns';
import {holidayDto} from '../../Dto/calendar.dto';

interface CalendarProps {
    dateParams: {
        month: Date;
        specialDay: holidayDto[];
    };
}


export default function CalendarDays({ dateParams } : CalendarProps) {
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let monthStart = startOfMonth(dateParams.month);
    let startDate = startOfWeek(monthStart);
    let holidays = dateParams.specialDay;
    const rows = [];
    let days = [];
    let count = 0;

    function findHoliday(value: Date) {
        const year = value.getFullYear().toString();
        const month = value.getMonth() + 1 < 10 ? '0' + (value.getMonth() + 1).toString() : value.getMonth() + 1;
        const day = value.getDate() < 10 ? '0' + value.getDate().toString() : value.getDate();
        const format = year + month + day;

        for(const holiday of holidays) {
            if(holiday.locdate.toString() === format) {
                return holiday.dateName;
            }
        }
        return '';
    }

    function handleClickDay() {
        
    }

    while (count <= 4 ) {
        days = [];
        let firstDayOfWeek = addWeeks(startDate, count);
        for (let i = 0; i < 7 ; i++ ) {
            let day = addDays(firstDayOfWeek, i);
            let spanClassName = 'text';
            let divClassName = 'day';
            let isHoliday = findHoliday(day);

            if(day.getMonth() != monthStart.getMonth()) {
                spanClassName += ' text-gray';
                divClassName = 'day-gray'
            }
            
            if(isHoliday) {
                spanClassName += ' text-red';
            }
            
            days.push(
                <div className={divClassName} onClick={divClassName != 'day-gray' ? handleClickDay : undefined}>
                    <span className={spanClassName} id={date[i]} key={date[i]}>{day.getDate()}</span>
                    {isHoliday && (
                        <span className={spanClassName}>{isHoliday}</span>
                    )}
                </div>
            )
        }
        rows.push(
            <div className='weeks'>{days}</div>
        );
        count++;
    }

    return (
        <div className='days'>{rows}</div>
    )

}