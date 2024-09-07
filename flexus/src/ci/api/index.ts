import { Router } from 'express';
import memoApi from './memo-api';

const router = Router();

// 각각의 API 라우트 등록
router.use('/memo', memoApi);

export default router;