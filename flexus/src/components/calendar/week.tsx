export default function CalendarWeek() {
    const days = [];
    const date = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    for (const day of date) {
        days.push(
            <div className='day' id={day} key={day}>
                <span>{day}</span>
            </div>
        );
    }
    
    return (
        <div className="days">{days}</div>
    );
}