import { Router } from "express";
import { authenticateToken } from "../middlewares/jwt";
import { CharacterCreate } from "../models/character";
import { createCharacter } from "../services/characterService";

const router = Router()

router.post('/create', authenticateToken, async (req, res) => {
    const { name } = req.body
    const characterCreate = new CharacterCreate()
    characterCreate.name = name

    try {
        await createCharacter(characterCreate, req.user.id);
    } catch (error) {
        res.status(400).json({error})
    }
})

export default router