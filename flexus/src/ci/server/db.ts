import { Pool } from 'pg';

// 데이터베이스 연결 설정
const pool = new Pool({
    user: 'postgres',       // PostgreSQL 사용자명
    host: 'localhost',           // 데이터베이스 호스트
    database: 'postgres',   // 데이터베이스 이름
    password: 'ehdrbs12',   // PostgreSQL 비밀번호
    port: 5432,                  // PostgreSQL 포트
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