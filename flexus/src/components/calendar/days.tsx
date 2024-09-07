import {startOfMonth, startOfWeek, addDays, addWeeks } from 'date-fns';
import dateFormat from './date-format'
import {holidayDto} from '../../Dto/calendar.dto';
import {memoDto} from '../../Dto/memo.dto'
import React from 'react';

interface CalendarProps {
    dataParams: {
        month: Date;
        specialDay: holidayDto[];
        memo: memoDto[];
    };
    handleClickDay: (id: Date) => void;
}


export default function CalendarDays({ dataParams, handleClickDay } : CalendarProps) {
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let monthStart = startOfMonth(dataParams.month);
    let startDate = startOfWeek(monthStart);
    let holidays = dataParams.specialDay;
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

    function formatTime(value: string) {
        return value.substring(0, 5);
    }

    while (count <= 4 ) {
        days = [];
        let firstDayOfWeek = addWeeks(startDate, count);
        let savedTime = '';
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

            savedTime = day.getFullYear() + '-' + dateFormat(day.getMonth()+1) + '-' + dateFormat(day.getDate());

            let filteredData = dataParams.memo.filter(item => {
                const data = new Date(item.savedtime).toISOString().split('T')[0];
                return data === savedTime;
            });
            if(filteredData.length != 0) {

            }

            days.push(
                <div className={divClassName} id={savedTime} key={savedTime} onClick={() => divClassName != 'day-gray' && handleClickDay(day)}>
                    <span className={spanClassName} id={date[i]} key={date[i]}>{day.getDate()}</span>
                    {isHoliday && (
                        <span className={spanClassName}>{isHoliday}</span>
                    )}
                    {filteredData.length > 0 && filteredData.map((data) => (
                        <span className="badge" key={data.id}>{data.title}
                            <p>{formatTime(data.starttime)} ~ {formatTime(data.endtime)}</p>
                        </span>
                    ))}
                </div>
            )
        }
        rows.push(
            <div className='weeks' key={`week-${count}`}>{days}</div>
        );
        count++;
    }

    return (
        <div className='days'>{rows}</div>
    )

}