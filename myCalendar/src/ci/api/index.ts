import { Router } from 'express';
import scheduleApi from './schedule.api';

const router = Router();

// 각각의 API 라우트 등록
router.use('/schedule', scheduleApi);

export default router;