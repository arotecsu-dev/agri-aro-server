import { Router } from "express";
import type { Request, Response } from "express";
import { soilsController } from "../controllers/soils.controller";

export const soilsRouter = Router();

soilsRouter.get("/", (req: Request, res: Response) =>
  soilsController.getSoils(req, res),
);
