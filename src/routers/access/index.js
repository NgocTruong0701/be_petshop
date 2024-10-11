'use strict'

import express from 'express';
import accessController from '../../controllers/access.controller.js';
import asyncHandler from '../../utils/asyncHandler.js';

const router = express.Router();

// SignUp
router.post('/signup', asyncHandler(accessController.signUp));
// Login
router.post('/login', asyncHandler(accessController.login));

export default router;