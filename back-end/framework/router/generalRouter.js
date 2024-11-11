import express from 'express';

const router = express.Router();

router.all('*', (req, res) => {
    res.json({ success: false, status: 404, error: 'Route not found.' });
});

export default router;