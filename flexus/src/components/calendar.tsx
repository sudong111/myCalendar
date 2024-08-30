import React, {useEffect, useState } from 'react';
import CalendarHeader from './calendar/header';
import CalendarWeek from './calendar/week';
import CalendarDays from './calendar/days'
import axios from 'axios';

export default function Calendar() {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [anniversary, setAnniversary] = useState([]);
    const [holidays, setHolidays] = useState([]);
    
    const fetchData = async () => {
        try {
            // 두 API 호출을 병렬로 실행합니다
            const [anniversaryRes, holidaysRes] = await Promise.all([
                axios.get('https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getAnniversaryInfo', {
                    params: {
                        ServiceKey: process.env.REACT_APP_DATA_GO_KR_API_KEY,
                        pageNo: 1,
                        nomOfRows: 100,
                        solYear: currentMonth.getFullYear(),
                        solMonth: ("0" + (currentMonth.getMonth() + 1)).slice(-2)
                    }
                }),
                axios.get('https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo', {
                    params: {
                        ServiceKey: process.env.REACT_APP_DATA_GO_KR_API_KEY,
                        solYear: currentMonth.getFullYear(),
                        solMonth: ("0" + (currentMonth.getMonth() + 1)).slice(-2)
                    }
                })
            ]);

            setAnniversary(anniversaryRes.data.response.body.items);
            setHolidays(holidaysRes.data.response.body.items);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
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
            <CalendarDays
                dateParams={
                {
                    month: currentMonth,
                    holidays: holidays,
                    anniversary: anniversary
                }}/>
        </div>
    )
}