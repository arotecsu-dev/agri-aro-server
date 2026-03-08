import type { Request, Response } from "express";
import { Crop } from "../database/models";

class CropsController {
  getCrops = async (req: Request, res: Response): Promise<void> => {
    try {
      const crops = await Crop.find();

      if (!crops || crops.length === 0) {
        res.status(200).json({
          crops: [],
        });
        return;
      }

      res.json({
        crops,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error fetching crops",
      });
    }
  };
}

export const cropsController = new CropsController();
