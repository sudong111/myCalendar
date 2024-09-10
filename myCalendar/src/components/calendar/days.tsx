import React from 'react';
import {startOfMonth, startOfWeek, addDays, addWeeks } from 'date-fns';
import formatter from '../../utils/formatter.util'
import {holidayDto} from '../../Dto/calendar.dto';
import {memoDto} from '../../Dto/memo.dto'
import { BiX, BiSolidPlusSquare } from "react-icons/bi";

interface CalendarProps {
    dataParams: {
        month: Date;
        specialDay: holidayDto[];
        memo: memoDto[];
    };
    handleClickDay: (id: Date) => void;
    handleCreateMemo: (id: Date) => void;
    handleDetailMemo: (id: any) => void;
    handleDeleteMemo: (id: any) => void;
}


export default function CalendarDays({ dataParams, handleClickDay, handleCreateMemo, handleDetailMemo, handleDeleteMemo } : CalendarProps) {
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

    function handleClickCreateMemo(day : Date) {
        handleCreateMemo(day);
    }

    function handleClickDetailMemo(id : number) {
        handleDetailMemo(id);
    }

    function handleClickDeleteMemo(id : number) {
       handleDeleteMemo(id);
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

            savedTime = day.getFullYear() + '-' + formatter('twoDigitsFormatter',(day.getMonth()+1).toString()) + '-' + formatter('twoDigitsFormatter',(day.getDate()).toString());

            let filteredData = dataParams.memo.filter(item => {
                const data = formatter('savedTimeFormatter',item.savedtime);
                return data === savedTime;
            });

            days.push(
                <div className={divClassName} id={savedTime} key={savedTime} onClick={() => divClassName != 'day-gray' && handleClickDay(day)}>
                    <div className="day-header">
                        <div>
                        <span className={spanClassName} id={date[i]} key={date[i]}>{day.getDate()}</span>
                        {isHoliday && (
                            <span className={spanClassName}>{isHoliday}</span>
                        )}
                        </div>
                        {divClassName != 'day-gray' && (
                            <div>
                                <button className="memo-create-button" onClick={
                                    (e) => {
                                        e.stopPropagation();
                                        handleClickCreateMemo(day);
                                    }
                                }>
                                    <BiSolidPlusSquare/></button>
                            </div>
                        )}
                    </div>
                    <div>
                        {filteredData.length > 0 && filteredData.map((data) => (
                            <span className="badge" key={data.id} onClick={
                                (e) => {
                                    e.stopPropagation();
                                    handleClickDetailMemo(data.id);
                                }
                            }>{data.title}
                                <div className="flex">
                                     <p>{formatter('startEndTimeFormatter',data.starttime)} ~ {formatter('startEndTimeFormatter',data.starttime)}</p>
                                    <button className="memo-delete-button" onClick={
                                        (e) => {
                                            e.stopPropagation();
                                            handleClickDeleteMemo(data.id);
                                        }
                                    }><BiX/></button>
                                </div>
                            </span>
                        ))}
                    </div>
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