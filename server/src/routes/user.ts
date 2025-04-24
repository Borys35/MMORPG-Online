import { Request, Response, Router } from 'express';
import { authenticateToken } from '../middlewares/jwt';

const router = Router()

router.get('/me', authenticateToken, async (req: Request, res: Response) => {
    res.json({ user: req.user });
})

export default router