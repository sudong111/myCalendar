import { format, addMonths, subMonths } from 'date-fns';
import React from 'react';
import { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";


interface CalendarProps {
    dataParams: {
        month: Date;
    };
    changedMonth: (newMonth: Date) => void;
}

export default function Header({ dataParams, changedMonth }: CalendarProps) {

    const [month, setMonth] = useState(dataParams.month);

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

    return (
        <div className="calendar-header">
            <div className="">
                <span>
                    <span className="month">
                        {format(month, 'M')}월
                    </span>
                    {format(month, 'yyyy')}
                </span>
            </div>
            <div className="month-change-button">
                <button onClick={handleClickPrevMonth}><BiChevronLeft /></button>
                <button onClick={handleClickNextMonth}><BiChevronRight /></button>
            </div>
        </div>
    );
};
