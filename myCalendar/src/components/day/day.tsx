import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Day() {
    const navigate = useNavigate();

    function handleClickBack() {
        navigate(-1);
    }

    return (
        <div>
            <button onClick={handleClickBack}>빽</button>

        </div>
    )
}