import React from "react";

const SEASONS = {
    spring: [3, 4, 5],
    summer: [6, 7, 8],
    fall: [9, 10, 11],
    winter: [12, 1, 2]
};

export default function Season(month: number) {
    for (const [season, months] of Object.entries(SEASONS)) {
        if (months.includes(month)) {
            return season;
        }
    }
}