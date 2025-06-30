import express from 'express';
import { sendotp } from '../controllers/otp.controller.js';
import { verifyotp } from '../controllers/otp.controller.js';

const router = express.Router();
router.post('/send', sendotp);
router.post('/verify', verifyotp);

export default router;
