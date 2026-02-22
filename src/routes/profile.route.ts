import { Router } from "express";
import { profileController } from "../controllers/profile.controller";

export const profileRouter = Router();

profileRouter.get("/", profileController.profile);
profileRouter.post("/change-password", profileController.changePassword);
