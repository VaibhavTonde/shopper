import express from 'express';
import { authUser, getUserProfile, createUser, updateUserProfile } from '../controller/user-controller.js';
import auth from '../middleware/authMiddleware.js'

const router = express.Router();

router.post('/login', authUser);
router.post('/', createUser);
router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);


export default router;