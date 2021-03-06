import { Request, Response } from 'express';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import { container } from 'tsyringe';

export default class ResetPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { token, newPassword } = request.body;

        const resetPasswordService = container.resolve(ResetPasswordService);
        await resetPasswordService.execute({
            token,
            newPassword,
        });

        return response.status(204).json();
    }
}
