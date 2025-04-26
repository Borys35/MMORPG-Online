import { Request, Response, Router } from 'express';
import { authenticateToken } from '../middlewares/jwt';
import { LoginUser, RegisterUser } from '../models/user';
import { login, register } from '../services/userService';
import { generateAccessToken } from '../services/jwt';

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

router.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body
    const loginUser = new LoginUser()
    loginUser.email = email
    loginUser.password = password

    try {
        const user = await login(loginUser);
        const token = generateAccessToken(user.email);
        res.json({ token });
    } catch (error) {
        res.status(400).json({ error });
    }
})


router.get('/me', authenticateToken, async (req: Request, res: Response) => {
    res.json({ user: req.user });
})

export default router