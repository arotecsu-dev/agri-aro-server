import { Router } from "express";
import type { Request, Response } from "express";
import { devicesController } from "../controllers/devices.controller";
import type { AuthRequest } from "../middleware/auth.middleware";

export const devicesRouter = Router();

devicesRouter.get("/:deviceId", (req: Request, res: Response) =>
  devicesController.get(req as AuthRequest, res),
);
devicesRouter.get("/:deviceId/data", (req: Request, res: Response) =>
  devicesController.getSensData(req as AuthRequest, res),
);
devicesRouter.post("/:deviceId/send", (req: Request, res: Response) =>
  devicesController.sendData(req as AuthRequest, res),
);
