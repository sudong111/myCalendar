import { Router } from 'express';
import pool from '../server/db'

const router = Router();

router.post('/schedule', async (req, res) => {
    const { title, startday, starttime, endtime, memo } = req.body.body;
    try {
        const result = await pool.query(
            'INSERT INTO schedule (title, startday, starttime, endtime, memo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [title, startday, starttime, endtime, memo]
        );
        res.status(200).json(result.rows[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/schedule', async (req, res) => {
    const { targetDay } = req.query;
    try {
        const result = await pool.query(
            `SELECT * FROM schedule
             WHERE startday >= DATE_TRUNC('month', TO_DATE($1, 'YYYY-MM'))
               AND startday < DATE_TRUNC('month', TO_DATE($1, 'YYYY-MM')) + INTERVAL '1 month'`,
            [targetDay]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ error: 'Internal Server Error' });
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
    const { title, startday, starttime, endtime, memo, id } = req.body.body;
    try {
        const result = await pool.query(
            'UPDATE schedule SET title = $1, startday = $2, starttime = $3, endtime = $4, memo = $5 WHERE id = $6 RETURNING *',
            [title, startday, starttime, endtime, memo, id]
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