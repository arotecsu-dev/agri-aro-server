import type { Request, Response } from "express";
import { User } from "../database/models/user";
import type { AuthRequest } from "../middleware/auth.middleware";
import { passwordService } from "../auth/password";

class ProfileController {
  profile = async (req: AuthRequest, res: Response): Promise<void> => {
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      res.sendStatus(404);
      return;
    }

    res.json({ user });
  };

  changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
    const { userId } = req;
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      res.sendStatus(404);
      return;
    }

    if (!passwordService.compare(currentPassword, user.password)) {
      res.sendStatus(401);
      return;
    }

    user.password = passwordService.hash(newPassword);
    await user.save();

    res.sendStatus(200);
  };
}

export const profileController = new ProfileController();
