import React, { useState, useEffect } from "react";
import {memoDto} from '../../Dto/memo.dto';
import { BiX, BiPlus, BiTime, BiPencil, BiTrash } from "react-icons/bi";

interface SideMemoProps {
    dataParams: {
        show: boolean;
        savedTime: string;
        memoDetail: memoDto;
    }
    handleCloseButton: () => void;
    handleSubmitMemo: (memo: memoDto) => void;
    handleModifyMemo: (memo: memoDto) => void;
    handleDeleteMemo: (id: any) => void;
}

export default function SideMemo({ dataParams, handleCloseButton, handleSubmitMemo, handleModifyMemo, handleDeleteMemo } : SideMemoProps) {
    const [memo, setMemo] = useState<memoDto>(dataParams.memoDetail);

    function handleChangedValues(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target;
        setMemo(prevMemo => ({
            ...prevMemo,
            [name]: value,
            savedtime: dataParams.savedTime
        }));
    }

    function handleSubmitButton() {
        handleSubmitMemo(memo);
    }

    function handleModifyButton() {
        handleModifyMemo(memo);
    }

    function handleDeleteButton() {
        handleDeleteMemo(memo.id);
    }

    useEffect(() => {
        setMemo(dataParams.memoDetail);
    }, [dataParams.memoDetail]);
    
    return (
        <div className={dataParams.show ? 'side-on' : 'side-off'}>
            <div className="side-header">
                <div className="side-title">
                    <p className="title">
                        메모 {memo.id === 0 ? '생성' : '수정'}
                    </p>
                    <p className="desc">({dataParams.savedTime})</p>
                </div>
                <button className="side-close-button" onClick={handleCloseButton}><BiX/></button>
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
                {memo.id === 0 ? (
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
