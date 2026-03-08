import { Router } from "express";
import type { Request, Response } from "express";
import { profileController } from "../controllers/profile.controller";
import type { AuthRequest } from "../middleware/auth.middleware";

export const profileRouter = Router();

profileRouter.get("/", (req: Request, res: Response) =>
  profileController.profile(req as AuthRequest, res),
);
profileRouter.post("/change-password", (req: Request, res: Response) =>
  profileController.changePassword(req as AuthRequest, res),
);
