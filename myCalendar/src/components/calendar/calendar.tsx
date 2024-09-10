import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CalendarHeader from './header';
import CalendarWeek from './week';
import CalendarDays from './days';
import SideMemo from './side-memo';
import formatter from '../../utils/formatter.util'
import {holidayDto} from '../../Dto/calendar.dto';
import {memoDto} from '../../Dto/memo.dto'

export default function Calendar() {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [holiday, setHoliday] = useState<holidayDto[]>([]);
    const [memo, setMemo] = useState<memoDto[]>([]);
    const [savedTime, setSavedTime] = useState('');
    const [loadData, setLoadData] = useState(false);
    const [showMemo, setShowMemo] = useState(false);
    const [changeMemo, setChangeMemo] = useState(false);
    const defaultMemo = {
        id: 0,
        title: '',
        savedtime: savedTime,
        starttime: '00:00',
        endtime: '00:00',
        memo: ''
    }
    const [memoDetail, setMemoDetail] = useState<memoDto>(defaultMemo);

    async function getMemo() {
        try {
            const params = {
                savedTime: currentMonth.getFullYear() + '-' + (currentMonth.getMonth() + 1)
            }

            const response = await axios.get('http://localhost:8080/api/memo', {params});
            setMemo(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function getDate() {
        try {
            const params = {
                ServiceKey: process.env.REACT_APP_DATA_GO_KR_API_KEY,
                solYear: currentMonth.getFullYear(),
                solMonth: ("0" + (currentMonth.getMonth() + 1)).slice(-2)
            }

            const response = await axios.get('https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo', {params});

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
            setLoadData(true);
        }
    }

    async function handleSubmitMemo(newMemo: memoDto) {
        try {
            const response = await axios.post('http://localhost:8080/api/memo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: newMemo
            })

            setChangeMemo((prev) => !prev);

            const result = await response.data;
            console.log('Post successful:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function handleModifyMemo(newMemo: memoDto) {
        try {
            const response = await axios.put('http://localhost:8080/api/memo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: newMemo
            })

            setChangeMemo((prev) => !prev);

            const result = await response.data;
            console.log('Post successful:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    async function handleDeleteMemo(id: number) {
        try {
            const params = {
                id: id
            }

            const response = await axios.delete('http://localhost:8080/api/memo', {params});
            setShowMemo(false);
            setChangeMemo((prev) => !prev);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    async function handleDetailMemo(id: number) {
        try {
            const params = {
                id: id
            }

            const response = await axios.get('http://localhost:8080/api/memo/detail', {params});
            setMemoDetail(response.data);

            setSavedTime(formatter('savedTimeFormatter', response.data.savedtime));
            setShowMemo(true);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function handleChangeMonth(newMonth: Date) {
        setShowMemo(false);
        setCurrentMonth(newMonth);
    }

    function handleClickDay(id: Date) {
        setShowMemo(false);
    }

    function handleCreateMemo(id: Date) {
        let savedTime = formatter('savedTimeFormatter', id.toISOString())
        setMemoDetail(defaultMemo);
        setSavedTime(savedTime);
        setShowMemo(true);
    }

    function handleCloseButton() {
        setShowMemo(false);
    }

    useEffect(() => {
        setLoadData(false);
        getDate();
    }, [currentMonth]);

    useEffect(() => {
        getMemo();
    }, [changeMemo, showMemo]);

    return (
        <div className="container">
            <CalendarHeader
                dataParams={
                    {month: currentMonth}}
                changedMonth={handleChangeMonth}
            />
            <div className="calendar-container">
                <div className="calendar">
                    <CalendarWeek/>
                    {loadData && (
                        <CalendarDays
                            dataParams={
                                {
                                    month: currentMonth,
                                    specialDay: holiday,
                                    memo: memo
                                }}
                            handleClickDay={handleClickDay}
                            handleCreateMemo={handleCreateMemo}
                            handleDetailMemo={handleDetailMemo}
                            handleDeleteMemo={handleDeleteMemo}
                        />
                    )}
                </div>
                <SideMemo
                    dataParams={
                        {
                            show: showMemo,
                            savedTime: savedTime,
                            memoDetail: memoDetail
                        }}
                    handleCloseButton={handleCloseButton}
                    handleSubmitMemo={handleSubmitMemo}
                    handleModifyMemo={handleModifyMemo}
                    handleDeleteMemo={handleDeleteMemo}/>
            </div>
        </div>
    )
}