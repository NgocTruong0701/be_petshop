'use strict'

import accessRouter from '../routers/access/index.js';
import express from 'express';

const router = express.Router();

router.use('/v1/api', accessRouter);

export default router;