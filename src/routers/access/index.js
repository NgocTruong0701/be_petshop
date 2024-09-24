'use strict'

import express from 'express';
import accessController from '../../controllers/access.controller.js';

const router = express.Router();

// SignUp
router.post('/signup', accessController.signUp);

export default router;