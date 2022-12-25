import express from 'express';
const router = express.Router();
import { register, login, logout, updateUser, getCurrentUser } from "../controllers/authController.js";
import authUser from '../middleware/auth.js';
import rateLimiter from 'express-rate-limit';

const apiLimiter = rateLimiter({

    windowMs: 15 * 60 + 1000,
    max: 10,
    message: 'Too many requests from this IP address, please try again after 15 minutes'
})

router.route('/register').post(apiLimiter, register)
router.route('/login').post(apiLimiter, login)
router.route('/logout').get(logout)
router.route('/updateUser').patch(authUser, updateUser)
router.route('/getCurrentUser').get(authUser, getCurrentUser)

export default router;