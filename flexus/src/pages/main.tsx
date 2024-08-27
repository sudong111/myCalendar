import React, {useEffect, useState} from 'react';
import { Link, Route } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';

export default function Main() {

    return (
        <div className="div-css">
            <div className="div-30-css max-h-96">
                <div className="card-css">
                    <h5 className="title-css pb-3">오늘 할 일</h5>
                    <p className="text-gray-600">10:00 - 아침 운동</p>
                </div>
                <div className="card-css">
                    <h5 className="title-css pb-3">오늘 할 일</h5>
                    <p className="text-gray-600">10:00 - 아침 운동</p>
                </div>
            </div>
        </div>
    )
}