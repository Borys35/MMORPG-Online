import { Length } from "class-validator";

export class CharacterCreate {
    @Length(3, 20)
    name: string = '';
}