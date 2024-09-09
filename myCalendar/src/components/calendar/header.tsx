import React,  {useEffect, useState } from 'react';
import Season from './season';
import { format, addMonths, subMonths } from 'date-fns';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

interface CalendarProps {
    dataParams: {
        month: Date;
    };
    changedMonth: (newMonth: Date) => void;
}

export default function Header({ dataParams, changedMonth }: CalendarProps) {
    const [month, setMonth] = useState(dataParams.month);
    const [season, setSeason] = useState(Season(month.getMonth()+1));
    console.log(season);

    function handleClickPrevMonth() {
        const newMonth = subMonths(month, 1);
        setMonth(newMonth);
        changedMonth(newMonth);
    }

    function handleClickNextMonth() {
        const newMonth = addMonths(month, 1);
        setMonth(newMonth);
        changedMonth(newMonth);
    }

    useEffect(() => {
        setSeason(Season(month.getMonth()+1));
    }, [month]);

    return (
        <div className={season+" calendar-header"}>
            <div>
                <span className="month">
                    {format(month, 'M')}월
                </span>
                {format(month, 'yyyy')}
            </div>
            <div className="month-change-button">
                <button onClick={handleClickPrevMonth}><BiChevronLeft /></button>
                <button onClick={handleClickNextMonth}><BiChevronRight /></button>
            </div>
        </div>
    );
};
