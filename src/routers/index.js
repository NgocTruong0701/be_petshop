'use strict'

import { apiKey, permission } from '../auth/checkAuth.js';
import accessRouter from '../routers/access/index.js';
import express from 'express';

const router = express.Router();

// check apiKey 
router.use(apiKey);

// check permission
router.use(permission('0000'));

router.use('/v1/api', accessRouter);

export default router;