import { Router } from 'express';
import pool from '../server/db'

const router = Router();

router.post('/memo', async (req, res) => {
    const { title, savedTime, startTime, endTime, memo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO memo (title, savedtime, starttime, endtime, memo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, savedTime, startTime, endTime, memo]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/memo', async (req, res) => {
    const { savedTime } = req.query;
    console.log(req);
    try {
        const result = await pool.query(
            `SELECT * FROM memo
             WHERE savedtime >= DATE_TRUNC('month', TO_DATE($1, 'YYYY-MM'))
               AND savedtime < DATE_TRUNC('month', TO_DATE($1, 'YYYY-MM')) + INTERVAL '1 month'`,
            [savedTime]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router;