import React, { useState, useEffect } from "react";
import {scheduleDto} from '../../Dto/schedule.dto';
import { BiX, BiPlus, BiTime, BiPencil, BiTrash } from "react-icons/bi";

interface SideScheduleProps {
    dataParams: {
        show: boolean;
        savedTime: string;
        memoDetail: scheduleDto;
    }
    handleCloseButton: () => void;
    handleSubmitSchedule: (schedule: scheduleDto) => void;
    handleModifySchedule: (schedule: scheduleDto) => void;
    handleDeleteSchedule: (id: any) => void;
}

export default function SideSchedule({ dataParams, handleCloseButton, handleSubmitSchedule, handleModifySchedule, handleDeleteSchedule } : SideScheduleProps) {
    const [schedule, setSchedule] = useState<scheduleDto>(dataParams.memoDetail);

    function handleChangedValues(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setSchedule(prevSchedule => ({
            ...prevSchedule,
            [name]: value,
            savedtime: dataParams.savedTime
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
        setSchedule(dataParams.memoDetail);
    }, [dataParams.memoDetail]);
    
    return (
        <div className={dataParams.show ? 'side-on' : 'side-off'}>
            <div className="side-header">
                <div className="side-title">
                    <p className="title">
                        메모 {schedule.id === 0 ? '생성' : '수정'}
                    </p>
                    <p className="desc">({dataParams.savedTime})</p>
                </div>
                <button className="side-close-button" onClick={handleCloseButton}><BiX/></button>
            </div>
            <div className="side-memo-title">
                <p>title</p>
                <input type="text" name="title" value={schedule.title} onChange={handleChangedValues} className="input" placeholder="제목을 입력하세요." required />
            </div>
            <div className="side-select-time">
                <p>time</p>
                <div className="flex relative">
                    <div className="timer">
                        <BiTime/>
                    </div>
                    <input type="time" className="input" name="starttime" step="60" value={schedule.starttime}
                           onChange={handleChangedValues} min="00:00" max="23:59"/>
                </div>
                <p className="ml-2">~</p>
                <div className="flex relative">
                    <div className="timer">
                        <BiTime/>
                    </div>
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
                        <BiPlus />
                    </button>
                ) : (
                    <>
                        <button className="side-confirm-button" onClick={handleModifyButton}>
                            <BiPencil />
                        </button>
                        <button className="side-delete-button" onClick={handleDeleteButton}>
                            <BiTrash />
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}
