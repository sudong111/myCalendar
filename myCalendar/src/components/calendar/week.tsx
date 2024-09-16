import React from "react";

export default function CalendarWeek() {
    const days = [];
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (const day of date) {
        days.push(
            <td className='grid-td' id={day} key={day}>
                <span>{day}</span>
            </td>
        );
    }
    
    return (
        <table className="table-week">
            <tbody><tr>{days}</tr></tbody>
        </table>
    );
}