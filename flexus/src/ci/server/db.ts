import { Pool } from 'pg';
require('dotenv').config();

// 데이터베이스 연결 설정
const pool = new Pool({
    user: process.env.REACT_APP_DATA_DB_USER,
    host: process.env.REACT_APP_DATA_DB_HOST,
    database: process.env.REACT_APP_DATA_DB_NAME,
    password: process.env.REACT_APP_DATA_DB_PW,
    port: 5432,
});

// 데이터베이스 연결 확인
pool.on('connect', () => {
    console.log('Connected to the database');
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

export default pool;