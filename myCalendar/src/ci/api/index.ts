import { Router } from 'express';
import scheduleApi from './schedule.api';

const router = Router();

router.use('/schedule', scheduleApi);

export default router;