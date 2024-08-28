import { format, addMonths, subMonths } from 'date-fns';
import { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";


interface CalendarProps {
    dateParams: {
        month: Date;
    };
}

export default function CalendarHeader({ dateParams }: CalendarProps) {

    function handleClickprevMonth() {
        setMonth(prevMonth => subMonths(prevMonth, 1));
    }

    function handleClicknextMonth() {
        setMonth(nextMonth => addMonths(nextMonth, 1));
    }

    const [month, setMonth] = useState(dateParams.month);

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
            <div className="">
                <button onClick={handleClickprevMonth}><BiChevronLeft /></button>
                <button onClick={handleClicknextMonth}><BiChevronRight/></button>
            </div>
        </div>
    );
};
