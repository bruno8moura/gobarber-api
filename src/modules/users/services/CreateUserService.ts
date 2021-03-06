import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import IGetUserDTO from '../dtos/IGetUserDTO';
import IHashProvider from '../providers/HashProviders/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
}
@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProviders: IHashProvider,
    ) {}

    public async execute({
        name,
        email,
        password,
    }: IRequest): Promise<IGetUserDTO> {
        const checkUsersExists = await this.usersRepository.findByEmail(email);

        if (checkUsersExists) {
            throw new AppError('Email address already used.');
        }

        const hashedPassword = await this.hashProviders.generateHash(password);
        const newUser = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
        };
    }
}

export default CreateUserService;
