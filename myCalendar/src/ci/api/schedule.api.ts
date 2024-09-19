import { Router } from 'express';
import pool from '../server/db'

const router = Router();

router.post('/schedule', async (req, res) => {
    const { title, startday, endday, starttime, endtime, memo } = req.body.body;
    try {
        const result = await pool.query(
            'INSERT INTO schedule (title, startday, endday, starttime, endtime, memo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, startday, endday, starttime, endtime, memo]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/schedule', async (req, res) => {
    const { targetDay } = req.query;

    if (typeof targetDay !== 'string') {
        return res.status(400).json({ error: 'Invalid targetDay' });
    }

    try {
        const [year, month] = targetDay.split('-').map(Number);
        const targetMonthStart = `${year}-${month.toString().padStart(2, '0')}-01`;
        const targetMonthEnd = new Date(year, month, 0);
        const formattedTargetMonthEnd = targetMonthEnd.toISOString().split('T')[0];

        const result = await pool.query(
            `SELECT * FROM schedule
             WHERE startday <= $1::date
               AND endday >= $2::date`,
            [
                formattedTargetMonthEnd,
                targetMonthStart
            ]
        );

        res.status(200).json(result.rows);
    } catch (err) {
        console.error('쿼리 실행 중 오류 발생', err);
        res.status(500).json({ error: '서버 내부 오류' });
    }
});

router.delete('/schedule', async (req, res) => {
    const { id } = req.query;
    try {
        const result = await pool.query(
            `DELETE FROM schedule
             WHERE id= $1`,
            [id]
        );
        res.status(200).json(result);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.put('/schedule', async (req, res) => {
    const { title, startday, endday, starttime, endtime, memo, id } = req.body.body;
    try {
        const result = await pool.query(
            'UPDATE schedule SET title = $1, startday = $2, endday = $3, starttime = $4, endtime = $5, memo = $6 WHERE id = $7 RETURNING *',
            [title, startday, endday, starttime, endtime, memo, id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/schedule/detail', async (req, res) => {
    const { id } = req.query;
    try {
        const result = await pool.query(
            `SELECT * FROM schedule
             WHERE id= $1`,
            [id]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;