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

    while (count <= 4) {
        let days = [];
        let dateList = [];
        let scheduleList = [];
        let firstDayOfWeek = addWeeks(startOfWeek(startDayOfMonth), count);
        let endDayOfWeek = addWeeks(endOfWeek(startDayOfMonth), count);
        let startDay = '';
        let divClassName = 'day';

        const filteredData = getFilteredSchedulesForWeek(dataParams.scheduleList, firstDayOfWeek, endDayOfWeek);

        // grid
        for (let i = 0; i < 7; i++) {
            days.push(
                <td className={'grid-td ' + divClassName} key={`grid-${count}-${i}`}></td>
            );
        }

        // schedule
        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 7; j++) {
                let day = addDays(firstDayOfWeek, j);
                let spanClassName = 'text';
                let isHoliday = findHoliday(day);

                if (day.getMonth() !== startDayOfMonth.getMonth()) {
                    spanClassName += ' text-gray';
                    divClassName = 'day-gray';
                }

                if (isHoliday) {
                    spanClassName += ' text-red';
                }

                startDay = day.getFullYear() + '-' + formatter('twoDigitsFormatter', (day.getMonth() + 1).toString()) + '-' + formatter('twoDigitsFormatter', (day.getDate()).toString());

                if(i === 0) {
                    dateList.push(
                        <td key={`date-${count}-${i}-${j}`}>
                            <div className='day-header'>
                                <div>
                                    <span className={spanClassName}>{day.getDate()}</span>
                                    {isHoliday && <span className={spanClassName}>{isHoliday}</span>}
                                </div>

                                {divClassName !== 'day-gray' && (
                                    <div>
                                        <button className="schedule-create-button" onClick={(e) => {
                                            e.stopPropagation();
                                            handleClickCreateSchedule(day);
                                        }}>
                                            <BiSolidPlusSquare />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </td>
                    );
                }
                else {
                    dateList.push(
                        <td key={`date-${count}-${i}-${j}`}>&nbsp;</td>
                    )
                }

            }
            scheduleList.push(<tr key={`schedule-${count}-${i}`}>{dateList}</tr>);
            dateList = [];
        }

        rows.push(
            <div className='weeks' key={`week-${count}`}>
                <table className='table-grid'>
                    <tbody>
                    <tr>{days}</tr>
                    </tbody>
                </table>
                <table className='table-schedule'>
                    <tbody>
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