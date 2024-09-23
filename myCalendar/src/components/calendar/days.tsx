import React from 'react';
import {startOfMonth, startOfWeek, addDays, addWeeks, endOfWeek} from 'date-fns';
import formatter from '../../utils/formatter.util'
import {holidayDto} from '../../Dto/calendar.dto';
import {scheduleDto} from '../../Dto/schedule.dto'
import { BiX, BiSolidPlusSquare } from "react-icons/bi";

interface CalendarProps {
    dataParams: {
        month: Date;
        holidayList: holidayDto[];
        scheduleList: scheduleDto[];
    };
    handleClickDay: (id: Date) => void;
    handleCreateSchedule: (id: Date) => void;
    handleDetailSchedule: (id: any) => void;
    handleDeleteSchedule: (id: any) => void;
}


export default function CalendarDays({ dataParams, handleClickDay, handleCreateSchedule, handleDetailSchedule, handleDeleteSchedule } : CalendarProps) {
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let startDayOfMonth = startOfMonth(dataParams.month);
    let holidayList = dataParams.holidayList;
    const rows = [];
    let days = [];
    let scheduleList = [];
    let dateList = [];
    let count = 0;

    function findHoliday(value: Date) {
        const year = value.getFullYear().toString();
        const month = value.getMonth() + 1 < 10 ? '0' + (value.getMonth() + 1).toString() : value.getMonth() + 1;
        const day = value.getDate() < 10 ? '0' + value.getDate().toString() : value.getDate();
        const format = year + month + day;

        for(const holiday of holidayList) {
            if(holiday.locdate.toString() === format) {
                return holiday.dateName;
            }
        }
        return '';
    }

    function getFilteredSchedulesForWeek(schedules: scheduleDto[], weekStart: Date, weekEnd: Date) {
        return schedules.filter(item => {
            const startday = new Date(item.startday);
            const endday = new Date(item.endday);

            return (startday <= weekEnd && endday >= weekStart);
        });
    }

    function handleClickCreateSchedule(day : Date) {
        handleCreateSchedule(day);
    }

    function handleClickDetailSchedule(id : number) {
        handleDetailSchedule(id);
    }

    function handleClickDeleteSchedule(id : number) {
       handleDeleteSchedule(id);
    }

    while (count <= 4 ) {
        days = [];
        dateList = [];
        scheduleList = [];
        let trList = [];
        let tdList = [];
        let firstDayOfWeek = addWeeks(startOfWeek(startDayOfMonth), count);
        let endDayOfWeek = addWeeks(endOfWeek(startDayOfMonth), count);
        let startDay = '';

        const filteredData = getFilteredSchedulesForWeek(dataParams.scheduleList, firstDayOfWeek, endDayOfWeek);

        //days
        for (let i = 0; i < 7 ; i++ ) {
            let day = addDays(firstDayOfWeek, i);
            let spanClassName = 'text';
            let divClassName = 'day';
            let isHoliday = findHoliday(day);

            if(day.getMonth() != startDayOfMonth.getMonth()) {
                spanClassName += ' text-gray';
                divClassName = 'day-gray'
            }
            
            if(isHoliday) {
                spanClassName += ' text-red';
            }

            startDay = day.getFullYear() + '-' + formatter('twoDigitsFormatter',(day.getMonth()+1).toString()) + '-' + formatter('twoDigitsFormatter',(day.getDate()).toString());

            days.push(
                <td className={'grid-td ' + divClassName} key={startDay} onClick={() => divClassName != 'day-gray' && handleClickDay(day)}></td>
            )

            dateList.push(
                <td>
                    <div className='day-header'>
                        <div>
                            <span className={spanClassName} id={date[i]} key={date[i]}>{day.getDate()}</span>
                            {isHoliday && (
                                <span className={spanClassName}>{isHoliday}</span>
                            )}
                        </div>

                        {divClassName != 'day-gray' && (
                            <div>
                                <button className="schedule-create-button" onClick={
                                    (e) => {
                                        e.stopPropagation()
                                        handleClickCreateSchedule(day);
                                    }
                                }>
                                    <BiSolidPlusSquare/></button>
                            </div>
                        )}
                    </div>
                </td>
            )
        }
        //week
        filteredData.forEach((item, index) => {
            for(let i = 0 ; i < 7 ; i++) {
                tdList.push(
                    <td>&nbsp;</td>
                )
            }
            trList.push(
                <tr>
                    {tdList}
                </tr>
            );
        });

        scheduleList.push(
            {trList}
        )

        rows.push(
            <div className='weeks' key={`week-${count}`}>
                <table className='table-grid'>
                    <tbody>
                    <tr>
                    {days}
                    </tr>
                    </tbody>
                </table>
                <table className='table-schedule'>
                    <tbody>
                    <tr>{dateList}</tr>
                    {scheduleList}
                    </tbody>
                </table>
                </div>
        );
        count++;
    }

    return (
        <div className='days'>{rows}</div>
    )

}