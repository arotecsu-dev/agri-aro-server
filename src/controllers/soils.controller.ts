import type { Request, Response } from "express";
import { Soil } from "../database/models";

class SoilsController {
  getSoils = async (req: Request, res: Response): Promise<void> => {
    try {
      const soils = await Soil.find();

      if (!soils || soils.length === 0) {
        res.status(200).json({
          soils: [],
        });
        return;
      }

      res.json({
        soils,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching soils",
      });
    }
  };
}

export const soilsController = new SoilsController();
