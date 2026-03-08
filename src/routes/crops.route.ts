import { Router } from "express";
import type { Request, Response } from "express";
import { cropsController } from "../controllers/crops.controller";

export const cropsRouter = Router();

cropsRouter.get("/", (req: Request, res: Response) =>
  cropsController.getCrops(req, res),
);
