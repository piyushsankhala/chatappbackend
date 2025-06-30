import express from 'express';
import { sendOtp } from '../controllers/otp.controllers.js';
import { verifyOtp } from '../controllers/otp.controllers.js';

const router = express.Router();
router.post('/send', sendotp);
router.post('/verify', verifyotp);

export default router;
