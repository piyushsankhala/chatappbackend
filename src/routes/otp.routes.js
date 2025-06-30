import express from 'express';
<<<<<<< HEAD
import { sendotp } from '../controllers/otp.controllers.js';
import { verifyotp } from '../controllers/otp.controllers.js';
=======
import { sendotp } from '../controllers/otp.controller.js';
import { verifyotp } from '../controllers/otp.controller.js';
>>>>>>> 43687a21dfc9a858f5922b6e06c3654d6ad674ab

const router = express.Router();
router.post('/send', sendotp);
router.post('/verify', verifyotp);

export default router;
