import type { Request, Response } from "express";
import type { AuthRequest } from "../middleware/auth.middleware";
import { Device } from "../database/models/device";
import { SensorReading } from "../database/models/sensor-reading";

class DevicesController {
  async get(req: AuthRequest, res: Response) {
    const { deviceId } = req.params;

    const device = await Device.findOne({ deviceId });
    if (!device) return res.sendStatus(404);

    res.json({ device });
  }

  async getSensData(req: AuthRequest, res: Response) {
    const { deviceId } = req.params;

    const device = await Device.findOne({ deviceId });
    if (!device) return res.sendStatus(404);

    const { minDate, maxDate } = req.query;

    const readings = await SensorReading.find({
      deviceId: deviceId,
      moment: {
        $gte: new Date(minDate as string),
        $lte: new Date(maxDate as string),
      },
    });

    res.json({ readings });
  }

  async sendData(req: AuthRequest, res: Response) {
    const { deviceId } = req.params;

    const device = await Device.findOne({ deviceId });
    if (!device) return res.sendStatus(404);

    const {
      phosphorus,
      nitrogen,
      ph,
      potassium,
      temperature,
      ambientHumidity,
      soilMoisture,
    } = req.body;

    const newReading = SensorReading.create({
      deviceId,
      phosphorus,
      nitrogen,
      ph,
      potassium,
      temperature,
      ambientHumidity,
      soilMoisture,
    });

    res.json({
      data: newReading,
    });
  }
}

export const devicesController = new DevicesController();
