import { validate } from "class-validator";
import { CharacterCreate } from "../models/character";
import prisma from "../prisma/client";

export async function createCharacter(characterCreate: CharacterCreate, userId: number) {
    const errors = await validate(characterCreate);
    if (errors.length > 0) {
        throw { message: 'Validation failed', errors };
    }

    try {
        await prisma.character.create({
            data: {
                name: characterCreate.name,
                experience: 0,
                level: 1,
                gold: 10,
                userId,
                stats: {
                    create: {
                        strength: 1,
                        dexterity: 1,
                        intelligence: 1,
                        health: 10,
                        maxHealth: 10,
                    }
                },
                // items: {
                //     connect: {
                //         id: 0
                //     }
                // }
            }
        })
    } catch (error) {
        throw { message: 'Character creation failed' };
    }
}