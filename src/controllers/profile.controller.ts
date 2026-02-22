import type { Request, Response } from "express";
import { User } from "../database/models/user";
import type { AuthRequest } from "../middleware/auth.middleware";
import { passwordService } from "../auth/password";

class ProfileController {
  async profile(req: AuthRequest, res: Response) {
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);

    res.json({ user });
  }

  async changePassword(req: AuthRequest, res: Response) {
    const { userId } = req;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.sendStatus(404);

    if (!passwordService.compare(currentPassword, user.password))
      return res.sendStatus(401);

    user.password = passwordService.hash(newPassword);
    await user.save();

    res.sendStatus(200);
  }
}

export const profileController = new ProfileController();
