import express from 'express';

const router = express.Router();

router.get('*', (req, res) => {
    res.json({ error: '404 Page not Found.', status: 404 });
})

export default router;