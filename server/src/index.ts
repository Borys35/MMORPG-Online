import express, {Request, Response} from 'express'
import prisma from './prisma/client'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes'
import characterRoutes from './routes/characterRoutes';

const app = express();
const port = 8080

dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/users', userRoutes)
app.use('/characters', characterRoutes)

app.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({})
    res.json({users})
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})