import express, {Request, Response} from 'express'
import prisma from './prisma/client'

const app = express();
const port = 8080
// const prisma = new PrismaClient()

app.get('/', async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({})
    res.json({users})
})

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`)
})