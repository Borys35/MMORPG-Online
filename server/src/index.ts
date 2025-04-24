import express, {Request, Response} from 'express'
import prisma from './prisma/client'
import dotenv from 'dotenv'
import userRoutes from './routes/user'

const app = express();
const port = 8080

dotenv.config()

app.use('/users', userRoutes)

app.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({})
    res.json({users})
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})