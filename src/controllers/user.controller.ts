import { Request, Response } from "express";
import { ConflictingUserError, UserNotFoundError, UsersService } from "../services/user.service";
import { validateRequest } from "../utils/validate-schema";
import { userIdSchema } from "../validations/user.schema";

export class UserController {
    constructor(
        private userService: UsersService
    ) { }

    async findAllUsers(req: Request, res: Response) {
        const user = req.user;
        if (!user) {
            res.status(401).json({
                message: "Usuario no autenticado",
            });
        }

        const users = await this.userService.findAll();

        return res.status(200).json({
            users,
        });
    }

    async findById(req: Request, res: Response) {
        const { data, error, success } = await validateRequest(req, userIdSchema, "params")
        if (!success) {
            return res.status(400).json(error);
        }
        const user = await this.userService.findById(data.userId);

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        const { password: _, ...rest } = user.toJSON();

        res.status(200).json({ user: rest });
    }

    async deleteUserById(req: Request, res: Response) {
        const { data, error, success } = await validateRequest(req, userIdSchema, "params")
        if (!success) {
            return res.status(400).json(error);
        }
        const deleted = await this.userService.delete(data.userId);

        if (!deleted) {
            return res.status(404).json({
                message: "Usuario no encontrado",
            });
        }

        return res.status(200).json({
            message: "Usuario eliminado exitosamente",
        });
    }

    async updateProfile(req: Request, res: Response) {
        const user = req.user;
        try {
            const updated = await this.userService.update(user.user_id, req.body);

            const { password: _, ...withoutPassword } = updated.toJSON();

            res.status(200).json({
                user: withoutPassword,
                message: "Perfil actualizado correctamente",
            });
        } catch (err) {
            if (err instanceof UserNotFoundError) {
                return res.status(404).json({
                    message: err.message,
                });
            }
            if (err instanceof ConflictingUserError) {
                return res.status(400).json({
                    message: err.message,
                });
            }
            console.error("Error al actualizar perfil: ", err);
            return res.status(500).json({
                message: "Error interno del servidor",
            });
        }
    }

    async updateUserById(req: Request, res: Response) {
        const { data, error, success } = await validateRequest(req, userIdSchema, "params")
        if (!success) {
            return res.status(400).json(error);
        }

        try {
            const updated = await this.userService.update(data.userId, req.body);

            const { password: _, ...withoutPassword } = updated.toJSON();

            res.status(200).json({
                user: withoutPassword,
                message: "Usuario actualizado correctamente",
            });
        } catch (err) {
            if (err instanceof UserNotFoundError) {
                return res.status(404).json({
                    message: err.message,
                });
            }
            if (err instanceof ConflictingUserError) {
                return res.status(400).json({
                    message: err.message,
                });
            }
            console.error("Error al actualizar perfil: ", err);
            return res.status(500).json({
                message: "Error interno del servidor",
            });
        }
    }
}