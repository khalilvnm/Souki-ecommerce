import express from 'express';
import { sendMessage, getAllMessages, markMessageAsRead } from '../controllers/messageControllers.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Public route - no authentication needed
router.post('/send', sendMessage);

// Protected routes - need authentication
router.post('/list', verifyToken, getAllMessages);
router.put('/mark-read/:messageId', verifyToken, markMessageAsRead);

export default router; 