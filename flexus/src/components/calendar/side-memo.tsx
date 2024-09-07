import axios from "axios";
import React from "react";
import { useState } from "react";
import {memoDto} from '../../Dto/memo.dto';
import { BiX, BiCheck, BiTime } from "react-icons/bi";

interface SideMemoProps {
    dataParams: {
        show: boolean;
        savedTime: string;
    }
    handleCloseButton: () => void;
}

export default function SideMemo({ dataParams, handleCloseButton } : SideMemoProps) {
    console.log(dataParams.savedTime)
    const [memo, setMemo] = useState<memoDto>({
        id:0,
        title: '',
        savedtime: dataParams.savedTime,
        starttime: '00:00',
        endtime: '00:00',
        memo: ''
    });

    function handleChangedValues(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setMemo(prevMemo => ({
            ...prevMemo,
            [name]: value,
            savedtime: dataParams.savedTime
        }));
        console.log(memo);
    }

    async function handleConfirmedButton() {
        console.log(memo);
        try {
            const response = await fetch('http://localhost:8080/api/memo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(memo)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            console.log('Post successful:', result);

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (

        <div className={dataParams.show ? 'side-on' : 'side-off'}>
            <div className="side-header">
                <p className="title">Memo</p>
                <button className="side-closed-button" onClick={handleCloseButton}><BiX/></button>
            </div>
            <div className="side-memo-title">
                <p>title</p>
                <input type="text" name="title" value={memo.title} onChange={handleChangedValues} className="input" placeholder="제목을 입력하세요." required />
            </div>
            <div className="side-select-time">
                <p>time</p>
                <div className="flex relative">
                    <div className="timer">
                        <BiTime/>
                    </div>
                    <input type="time" className="input" name="starttime" step="60" value={memo.starttime}
                           onChange={handleChangedValues} min="00:00" max="23:59"/>
                </div>
                <p className="ml-2">~</p>
                <div className="flex relative">
                    <div className="timer">
                        <BiTime/>
                    </div>
                    <input type="time" className="input" name="endtime" step="60" value={memo.endtime}
                           onChange={handleChangedValues} min="00:00" max="23:59"/>
                </div>
            </div>
            <div className="side-textarea">
                <textarea className="textarea" name="memo" value={memo.memo} onChange={handleChangedValues}
                          placeholder="메모를 작성하세요."></textarea>
            </div>
            <div className="side-confirm">
                <button className="side-confirmed-button" onClick={handleConfirmedButton}><BiCheck/></button>
            </div>
        </div>
    )
}