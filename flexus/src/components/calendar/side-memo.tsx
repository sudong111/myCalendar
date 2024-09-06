import { BiX, BiCheck } from "react-icons/bi";

interface SideMemoProps {
    show: boolean;
    handleCloseButton: () => void;
}

export default function SideMemo({ show, handleCloseButton } : SideMemoProps) {

    function handleConfirmedButton() {

    }

    return (

        <div className={show ? 'side-on' : 'side-off'}>
            <div className="side-header">
                <p className="title">Memo</p>
                <button className="side-closed-button" onClick={handleCloseButton}><BiX/></button>
            </div>
            <div className="side-memo-title">
                <p>title</p>
                <input type="text" className="input" placeholder="제목을 입력하세요." required />
            </div>
            <div className="side-select-time">
                <p>time</p>
                <input type="time" className="input"/>
                <p className="ml-2">~</p>
                <input type="time" className="input"/>
            </div>
            <div className="side-textarea">
                <textarea className="textarea" placeholder="메모를 작성하세요."></textarea>
            </div>
            <div className="side-confirm">
                <button className="side-confirmed-button" onClick={handleConfirmedButton}><BiCheck/></button>
            </div>
        </div>
    )
}