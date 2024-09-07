import React from 'react';

export default function dataFormat(value: number) {
    if(value < 10) {
        return '0' + value;
    }
    else {
        return value;
    }
}