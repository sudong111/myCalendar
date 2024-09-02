import React, {useEffect, useState } from 'react';
import CalendarHeader from './header';
import CalendarWeek from './week';
import CalendarDays from './days';
import {holidayDto} from '../../Dto/calendar.dto';
import axios from 'axios';

export default function Calendar() {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [holiday, setHoliday] = useState<holidayDto[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false);

    const fetchData = async () => {
        try {
            let holidayList = [];
            const [holidaysRes] = await Promise.all([
                axios.get('https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo', {
                    params: {
                        ServiceKey: process.env.REACT_APP_DATA_GO_KR_API_KEY,
                        solYear: currentMonth.getFullYear(),
                        solMonth: ("0" + (currentMonth.getMonth() + 1)).slice(-2)
                    }
                })
            ]);
            const holidayData = holidaysRes.data.response.body.items.item;
            
            if(holidayData != undefined) {
                if(!Array.isArray(holidayData)) {
                    holidayList.push(holidayData);
                }
                else {
                    holidayList = holidayData;
                }
            }
            
            setHoliday(holidayList || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setDataLoaded(true);
        }
    };

    useEffect(() => {
        setDataLoaded(false);
        fetchData();
    }, [currentMonth]);

    const handleChangeMonth = (newMonth: Date) => {
        setCurrentMonth(newMonth);
    }

    return (
        <div className="calendar">
           <CalendarHeader
               dateParams={
               {month: currentMonth}}
               changedMonth={handleChangeMonth}
           />
            <CalendarWeek />
            {dataLoaded && (
            <CalendarDays
                dateParams={
                {
                    month: currentMonth,
                    specialDay: holiday
                }}/>
            )}
        </div>
    )
}