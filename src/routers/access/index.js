'use strict'

import express from 'express';
import accessController from '../../controllers/access.controller.js';
import asyncHandler from '../../utils/asyncHandler.js';
import { authentication } from '../../auth/authUtils.js';

const router = express.Router();

// SignUp
router.post('/signup', asyncHandler(accessController.signUp));
// Login
router.post('/login', asyncHandler(accessController.login));

// Authentication 
router.use(authentication);

// Logout
router.post('/logout', asyncHandler(accessController.logout));

export default router;