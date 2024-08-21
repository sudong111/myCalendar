import React, {useEffect, useState} from 'react';
import { Link, Route } from 'react-router-dom';
import axios from "axios";
import instance from "./instance";

function Main() {
    const getAPIData = async () => {
        const res = instance({
            method: "get",
            url: "/armories/characters/rottenKick"
        }).then((data) => {
            console.log(data);
        });
    };

    useEffect(() => {
        getAPIData();
    }, []);

    return (
        <div className="main">
            <header
                className="bg-blue-600 flex flex-wrap text-nowrap justify-between items-center py-4 px-10 min-w-[850px] ">

            </header>
        </div>
    )
}

export default Main;