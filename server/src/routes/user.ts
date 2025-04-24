import { Request, Response, Router } from 'express';
import { authenticateToken } from '../middlewares/jwt';
import { RegisterUser } from '../models/user';
import { register } from '../services/user';

const router = Router()

router.post('/register', async (req: Request, res: Response) => {
    const { username, email, password, password2 } = req.body
    const registerUser = new RegisterUser()
    registerUser.username = username
    registerUser.email = email
    registerUser.password = password
    registerUser.password2 = password2

    try {
        await register(registerUser);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ error });
    }
})

router.get('/me', authenticateToken, async (req: Request, res: Response) => {
    res.json({ user: req.user });
})

export default router