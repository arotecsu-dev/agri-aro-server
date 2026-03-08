import { Router } from "express";
import type { Request, Response } from "express";
import { fieldsController } from "../controllers/fields.controller";
import type { AuthRequest } from "../middleware/auth.middleware";

export const fieldsRouter = Router();

fieldsRouter.get("/:fieldId/params", (req: Request, res: Response) =>
  fieldsController.getParams(req as AuthRequest, res),
);
fieldsRouter.get("/", (req: Request, res: Response) =>
  fieldsController.getAll(req as AuthRequest, res),
);
fieldsRouter.post("/", (req: Request, res: Response) =>
  fieldsController.create(req as AuthRequest, res),
);
fieldsRouter.get("/:fieldId", (req: Request, res: Response) =>
  fieldsController.getById(req as AuthRequest, res),
);
fieldsRouter.put("/:fieldId", (req: Request, res: Response) =>
  fieldsController.update(req as AuthRequest, res),
);
fieldsRouter.delete("/:fieldId", (req: Request, res: Response) =>
  fieldsController.delete(req as AuthRequest, res),
);

fieldsRouter.post("/:fieldId/invites", (req: Request, res: Response) =>
  fieldsController.addAssociate(req as AuthRequest, res),
);
fieldsRouter.delete("/:fieldId/invites/:email", (req: Request, res: Response) =>
  fieldsController.removeAssociate(req as AuthRequest, res),
);

fieldsRouter.post("/:fieldId/devices", (req: Request, res: Response) =>
  fieldsController.addDevice(req as AuthRequest, res),
);
