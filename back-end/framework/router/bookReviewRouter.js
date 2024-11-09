import express from 'express';

// middleware imports
import { authenticate } from '../middleware/authentication.js';
import { errorHandler } from '../middleware/error.js';
import { errorLogger } from '../middleware/logger.js';
import { eventLogger } from '../middleware/logger.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ this: 'happened' });
});

router.get('*', (req, res) => {
    res.json({ error: '404 Page not Found.', status: 404 });
})

export default router;