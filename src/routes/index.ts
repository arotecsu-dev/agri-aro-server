import type { Express, Request, Response } from "express";
import { loggerMiddleware } from "../middleware/logger.middleware";
import { authRouter } from "./auth.route";
import { profileRouter } from "./profile.route";
import { authMiddleware } from "../middleware/auth.middleware";

export function loadRoutes(app: Express) {
  app.use(loggerMiddleware);
  app.get("/", (req: Request, res: Response) => {
    res.json({
      message: "Agri ARO API is running",
    });
  });

  app.use("/auth", authRouter);
  app.use("/profile", authMiddleware.use, profileRouter);

  /*
  app.use("/devices", devicesRouter);
  app.use("/fields", fieldsRouter);
  app.use("/sensor-readings", sensorsRouter);


  app.get("/params/fields", authMiddleware, GetFieldsParamsRoute);

  app.post("/fields/:field_id/invites", authMiddleware, InviteFriendRoute);
  app.delete(
    "/fields/:field_id/invites/:email",
    authMiddleware,
    DeleteInviteRoute,
  );
  app.post("/fields", authMiddleware, AddFieldRoute);
  app.get("/fields/:id", authMiddleware, GetFieldRoute);
  app.put("/fields/:id", authMiddleware, UpdateFieldRoute);
  app.delete("/fields/:id", authMiddleware, DeleteFieldRoute);

  app.get("/devices/verify/:id", VerifyDeviceRoute);
  app.get("/devices/:id/data_sens", authMiddleware, DataSensDeviceRoute);
  app.post("/devices/send", DeviceSendDataRoute);
  app.get("/devices/:id", DeviceDataRoute);
  */
}
