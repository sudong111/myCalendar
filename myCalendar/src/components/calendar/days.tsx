import React from 'react';
import {startOfMonth, startOfWeek, addDays, addWeeks } from 'date-fns';
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
    let startDayOfWeek = startOfWeek(startDayOfMonth);
    let holidayList = dataParams.holidayList;
    const rows = [];
    let days = [];
    let scheduleList = [];
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
        let firstDayOfWeek = addWeeks(startDayOfWeek, count);
        let startDay = '';
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

            let filteredData = dataParams.scheduleList.filter(item => {
                const startDate = new Date(item.startday);
                const endDate = new Date(item.endday);

                const currentDay = new Date(day);
                currentDay.setHours(0, 0, 0, 0);

                return currentDay >= startDate && currentDay <= endDate;
            });

            days.push(
                <td className='grid-td'>

                </td>

                // <table className={divClassName} id={startDay} key={startDay} onClick={() => divClassName != 'day-gray' && handleClickDay(day)}>
                //     <div className="day-header">
                //         <div>
                //         <span className={spanClassName} id={date[i]} key={date[i]}>{day.getDate()}</span>
                //         {isHoliday && (
                //             <span className={spanClassName}>{isHoliday}</span>
                //         )}
                //         </div>
                //         {divClassName != 'day-gray' && (
                //             <div>
                //                 <button className="schedule-create-button" onClick={
                //                     (e) => {
                //                         e.stopPropagation()
                //                         handleClickCreateSchedule(day);
                //                     }
                //                 }>
                //                     <BiSolidPlusSquare/></button>
                //             </div>
                //         )}
                //     </div>
                //     <div>
                //         {filteredData.length > 0 && filteredData.map((data) => (
                //             <span className="badge" key={data.id} onClick={
                //                 (e) => {
                //                     e.stopPropagation();
                //                     handleClickDetailSchedule(data.id);
                //                 }
                //             }>{data.title}
                //                 <div className="flex">
                //                      <p>{formatter('timeFormatter',data.starttime)} ~ {formatter('timeFormatter',data.endtime)}</p>
                //                     {/*<button className="schedule-delete-button" onClick={*/}
                //                     {/*    (e) => {*/}
                //                     {/*        e.stopPropagation();*/}
                //                     {/*        handleClickDeleteSchedule(data.id);*/}
                //                     {/*    }*/}
                //                     {/*}><BiX/></button>*/}
                //                 </div>
                //             </span>
                //         ))}
                //     </div>
                // </table>
            )

            // scheduleList.push(
            //
            // )
        }
        if(count > 0)
        scheduleList.push(
            <tr>{startDay}</tr>
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