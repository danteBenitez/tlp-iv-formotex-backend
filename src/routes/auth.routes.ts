import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { usersService } from "../services/user.service";

const router = Router();
const controller = new AuthController(usersService);

router.post('/register', (req, res) => controller.signUp(req, res));
router.post('/login', (req, res) => controller.signIn(req, res));

export default router;


