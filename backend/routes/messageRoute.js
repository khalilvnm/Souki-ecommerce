import express from 'express';
import { sendMessage, getAllMessages, markMessageAsRead, deleteMessage } from '../controllers/messageController.js';
import userAuth from '../middlewares/UserAuth.js';

const router = express.Router();

// Public route - no authentication needed
router.post('/send', sendMessage);

// Protected routes - need authentication
router.post('/list', userAuth, getAllMessages);
router.put('/mark-read/:messageId', userAuth, markMessageAsRead);
router.delete('/delete/:messageId', userAuth, deleteMessage);

export default router; 