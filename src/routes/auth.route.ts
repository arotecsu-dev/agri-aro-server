import { Router } from "express";
import type { Request, Response } from "express";
import { authController } from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/register", (req: Request, res: Response) =>
  authController.register(req, res),
);
authRouter.post("/login", (req: Request, res: Response) =>
  authController.login(req, res),
);
authRouter.post("/forgot-password", (req: Request, res: Response) =>
  authController.forgotPassword(req, res),
);
authRouter.post("/verify-reset-token", (req: Request, res: Response) =>
  authController.verifyResetToken(req, res),
);
authRouter.post("/reset-password", (req: Request, res: Response) =>
  authController.resetPassword(req, res),
);
