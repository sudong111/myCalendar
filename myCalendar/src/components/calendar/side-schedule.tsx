import React, { useState, useEffect } from "react";
import {scheduleDto} from '../../Dto/schedule.dto';
import { BiX, BiPlus, BiTime, BiPencil, BiTrash } from "react-icons/bi";

interface SideScheduleProps {
    dataParams: {
        show: boolean;
        selectDay: string;
        scheduleInfo: scheduleDto;
    }
    handleCloseButton: () => void;
    handleSubmitSchedule: (schedule: scheduleDto) => void;
    handleModifySchedule: (schedule: scheduleDto) => void;
    handleDeleteSchedule: (id: any) => void;
}

export default function SideSchedule({ dataParams, handleCloseButton, handleSubmitSchedule, handleModifySchedule, handleDeleteSchedule } : SideScheduleProps) {
    const [schedule, setSchedule] = useState<scheduleDto>(dataParams.scheduleInfo);

    function handleChangedValues(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setSchedule(prevSchedule => ({
            ...prevSchedule,
            [name]: value,
            startday: dataParams.selectDay
        }));
    }

    function handleSubmitButton() {
        handleSubmitSchedule(schedule);
    }

    function handleModifyButton() {
        handleModifySchedule(schedule);
    }

    function handleDeleteButton() {
        handleDeleteSchedule(schedule.id);
    }

    useEffect(() => {
        setSchedule(dataParams.scheduleInfo);
    }, [dataParams.scheduleInfo]);
    
    return (
        <div className={dataParams.show ? 'side-on' : 'side-off'}>
            <div className="side-header">
                <div className="side-title">
                    <p className="title">
                        일정 {schedule.id === 0 ? '생성' : '수정'}
                    </p>
                    <p className="desc">({dataParams.selectDay})</p>
                </div>
                <button className="side-close-button" onClick={handleCloseButton}><BiX/></button>
            </div>
            <div className="side-schedule-title">
                <span className="input-text">제목</span>
                <div className="input-div">
                    <input type="text" name="title" value={schedule.title} onChange={handleChangedValues}
                           className="input"
                           placeholder="제목을 입력하세요." required/>
                </div>
            </div>
            <div className="side-select-time">
                <span className="input-text">시작 날짜</span>
                <div className="flex input-div">
                    <div className="timer">
                        <BiTime/>
                    </div>
                    <input type="date" className="input" name="startday" value={schedule.startday}
                           onChange={handleChangedValues}/>
                    <input type="time" className="input" name="starttime" step="60" value={schedule.starttime}
                           onChange={handleChangedValues} min="00:00" max="23:59"/>
                </div>
            </div>
            <div className="side-select-time">
                <span className="input-text">종료 날짜</span>
                <div className="flex input-div">
                    <div className="timer">
                        <BiTime/>
                    </div>
                    <input type="date" className="input" name="endday" value={schedule.endday}
                           onChange={handleChangedValues}/>
                    <input type="time" className="input" name="endtime" step="60" value={schedule.endtime}
                           onChange={handleChangedValues} min="00:00" max="23:59"/>
                </div>
            </div>
            <div className="side-textarea">
                <textarea className="textarea" name="memo" value={schedule.memo} onChange={handleChangedValues}
                          placeholder="메모를 작성하세요."></textarea>
            </div>
            <div className="side-confirm">
                {schedule.id === 0 ? (
                    <button className="side-confirm-button" onClick={handleSubmitButton}>
                        <BiPlus/>
                    </button>
                ) : (
                    <>
                        <button className="side-confirm-button" onClick={handleModifyButton}>
                            <BiPencil/>
                        </button>
                        <button className="side-delete-button" onClick={handleDeleteButton}>
                            <BiTrash/>
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
