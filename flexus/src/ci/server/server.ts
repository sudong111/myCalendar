import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRoutes from '../api/memo-api';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

// API 라우트 설정
app.use('/api', apiRoutes);

app.use(express.json());

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});