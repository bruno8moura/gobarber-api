import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import config from '../config/auth';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

export default class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);
        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw Error('Incorrect email/password combination.');
        }

        const passwordMatch = await compare(password, user.password);
        if (!passwordMatch) {
            throw Error('Incorrect email/password combination.');
        }

        const { secret, expiresIn } = config.jwt;
        const token = sign(
            {
                /* payload */
            },
            secret,
            {
                subject: user.id,
                expiresIn,
            },
        );

        const response = { user, token };
        return response;
    }
}