import type { NextFunction, Request, Response } from "express";
import { jwtService } from "../auth/jwt";

export interface AuthRequest extends Request {
  userId: string;
}

class AuthMiddleware {
  async use(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.split(" ")[1] : "";

    if (!token) return res.sendStatus(401);

    const decoded = jwtService.verifyToken(token);

    if (!decoded) return res.sendStatus(401);

    req.userId = decoded.userId;
    next();
  }
}

export const authMiddleware = new AuthMiddleware();
