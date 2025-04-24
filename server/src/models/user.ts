// export type RegisterUser = {
//     username: string;
//     email: string;
//     password: string;
//     password2: string;
// }

import { IsEmail, Length, Matches, MinLength } from "class-validator";
import { SameAs } from "../decorators/sameas.decorator";

export class RegisterUser {
    @Length(3, 20)
    username: string = '';
    @IsEmail()
    email: string = '';
    @Length(8, 32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string = '';
    @SameAs('password', {message: 'passwords do not match'})
    password2: string = '';
}

export class LoginUser {
    @IsEmail()
    email: string = '';
    @Length(8, 32)
    password: string = '';
}