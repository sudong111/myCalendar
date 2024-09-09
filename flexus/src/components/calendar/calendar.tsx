import React, {useEffect, useState } from 'react';
import CalendarHeader from './header';
import CalendarWeek from './week';
import CalendarDays from './days';
import SideMemo from './side-memo';
import formatter from '../../utils/formatter.util'
import {holidayDto} from '../../Dto/calendar.dto';
import {memoDto} from '../../Dto/memo.dto'
import axios from 'axios';

export default function Calendar() {

    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [holiday, setHoliday] = useState<holidayDto[]>([]);
    const [memo, setMemo] = useState<memoDto[]>([]);
    const [savedTime, setSavedTime] = useState('');
    const defaultMemo = {
        id:0,
        title: '',
        savedtime: savedTime,
        starttime: '00:00',
        endtime: '00:00',
        memo: ''
    }
    const [memoDetail, setMemoDetail] = useState<memoDto>(defaultMemo);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [memoShow, setMemoShow] = useState(false);
    const [submitMemo, setSubmitMemo] = useState(false);

    async function getMemo() {
        try {
            const params = {
                savedTime: currentMonth.getFullYear() + '-' + (currentMonth.getMonth()+1)
            };

            const response = await axios.get('http://localhost:8080/api/memo', { params });
            setMemo(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    async function getDate() {
        try {
            const params = {
                ServiceKey: process.env.REACT_APP_DATA_GO_KR_API_KEY,
                solYear: currentMonth.getFullYear(),
                solMonth: ("0" + (currentMonth.getMonth() + 1)).slice(-2)
            };

            const response = await axios.get('https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo', { params });

            const holidayData = response.data.response.body.items.item;

            let holidayList = [];
            if (holidayData) {
                if (!Array.isArray(holidayData)) {
                    holidayList.push(holidayData);
                } else {
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

    async function handleSubmitMemo(newMemo: memoDto) {
        try {
            const response = await axios.post('http://localhost:8080/api/memo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMemo)
            });

            setSubmitMemo((prev) => !prev);

            const result = await response.data;
            console.log('Post successful:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    useEffect(() => {
        setDataLoaded(false);
        getDate();
    }, [currentMonth]);

    useEffect(() => {
        getMemo();
    }, [submitMemo, memoShow]);

    function handleChangeMonth(newMonth: Date) {
        setCurrentMonth(newMonth);
    }

    function handleClickDay(id: Date) {
        let savedTime = id.getFullYear() + '-' + formatter('twoDigitsFormatter',(id.getMonth()+1).toString()) + '-' + formatter('twoDigitsFormatter', (id.getDate()).toString());
        setMemoDetail(defaultMemo);
        setSavedTime(savedTime);
        setMemoShow(true);
    }

    async function handleClickMemo(id: number) {
        try {
            const params = {
                id: id
            };

            const response = await axios.get('http://localhost:8080/api/memo/detail', { params });
            setMemoDetail(response.data);
            setMemoShow(true);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function handleDeleteMemo(id: number) {
        try {
            const params = {
                id: id
            };

            const response = await axios.delete('http://localhost:8080/api/memo', { params });
            setMemoShow(false);
            console.log(response);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function handleCloseButton() {
        setMemoShow(false);
    }

    return (
        <div className="calendar">
            <CalendarHeader
                dataParams={
                    {month: currentMonth}}
                changedMonth={handleChangeMonth}
            />
            <div className="h-full flex">
                <div className="h-full w-full flex flex-col">
                    <CalendarWeek/>
                    {dataLoaded && (
                        <CalendarDays
                            dataParams={
                                {
                                    month: currentMonth,
                                    specialDay: holiday,
                                    memo: memo
                                }}
                            handleClickDay={handleClickDay}
                            handleClickMemo={handleClickMemo}
                            handleDeleteMemo={handleDeleteMemo}
                        />
                    )}
                </div>
                <SideMemo
                    dataParams={
                        {
                            show: memoShow,
                            savedTime: savedTime,
                            memoDetail: memoDetail
                        }}
                    handleCloseButton={handleCloseButton}
                    handleSubmitMemo={handleSubmitMemo}/>
            </div>
        </div>
    )
}