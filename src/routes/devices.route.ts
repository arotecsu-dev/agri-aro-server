import { Router } from "express";
import { devicesController } from "../controllers/devices.controller";

export const devicesRouter = Router();

devicesRouter.get("/:deviceId", devicesController.get);
devicesRouter.get("/:deviceId/data", devicesController.getSensData);
devicesRouter.post("/:deviceId/send", devicesController.sendData);
