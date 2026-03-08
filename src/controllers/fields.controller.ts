import type { Request, Response } from "express";
import { Types } from "mongoose";
import { User } from "../database/models/user";
import type { AuthRequest } from "../middleware/auth.middleware";
import { Device } from "../database/models/device";
import { Field, SoilCrop } from "../database/models";

class FieldsController {
  getAll = async (req: AuthRequest, res: Response): Promise<void> => {
    const { userId } = req;

    const user = await User.findById(userId);
    if (!user) {
      res.sendStatus(401);
      return;
    }

    const ownFields = await Field.find({ userId })
      .populate("cropType")
      .populate("soilType");

    const associatedFields = await Field.find({ associates: user.email })
      .populate("cropType")
      .populate("soilType");

    const allFields = [...ownFields, ...associatedFields];

    res.json({
      fields: allFields,
    });
  };

  create = async (req: AuthRequest, res: Response): Promise<void> => {
    const { userId } = req;

    const {
      fieldName,
      deviceId,
      cropType,
      position,
      soilType,
      address,
      fieldSize,
    } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).end();
      return;
    }

    const field = await Field.create({
      fieldName,
      userId,
      cropType,
      soilType,
      position,
      address,
      fieldSize,
      associates: [],
    });

    if (deviceId && typeof deviceId === "string") {
      const device = await Device.findOne({ serieId: deviceId });
      if (device) {
        device.userId = userId;
        device.fieldId = field._id;
        await device.save();
      }
    }

    const populated = await (
      await field.populate("cropType")
    ).populate("soilType");

    res.status(201).json({
      field: populated,
    });
  };

  getById = async (req: AuthRequest, res: Response): Promise<void> => {
    const fieldId = req.params.fieldId as string;

    const field = await Field.findById(fieldId)
      .populate("cropType")
      .populate("soilType");

    if (!field) {
      res.status(404).end();
      return;
    }

    const devices = await Device.find({ fieldId: new Types.ObjectId(fieldId) });

    res.json({
      field,
      devices,
    });
  };

  update = async (req: AuthRequest, res: Response): Promise<void> => {
    const { fieldId } = req.params;
    const { fieldName, cropType, soilType, address, position, fieldSize } =
      req.body;

    const field = await Field.findByIdAndUpdate(
      fieldId,
      {
        fieldName,
        cropType,
        soilType,
        address,
        position,
        fieldSize,
      },
      { new: true },
    )
      .populate("cropType")
      .populate("soilType");

    if (!field) {
      res.status(404).json({
        success: false,
        message: "Campo não encontrado",
      });
      return;
    }

    res.json({
      field,
    });
  };

  delete = async (req: AuthRequest, res: Response): Promise<void> => {
    const fieldId = req.params.fieldId as string;

    const field = await Field.findByIdAndDelete(fieldId);

    if (!field) {
      res.status(404).end();
      return;
    }

    // Desassociar dispositivo
    const device = await Device.findOne({
      fieldId: new Types.ObjectId(fieldId),
    });
    if (device) {
      device.userId = null;
      device.fieldId = null;
      await device.save();
    }

    res.sendStatus(200);
  };

  addAssociate = async (req: AuthRequest, res: Response): Promise<void> => {
    const { fieldId } = req.params;
    const { email } = req.body;

    const field = await Field.findById(fieldId);

    if (!field) {
      res.status(404).end();
      return;
    }

    // Verificar se já é associado
    if (field.associates.includes(email)) {
      res.status(400).end();
      return;
    }

    field.associates.push(email);
    await field.save();

    const populated = await (
      await field.populate("cropType")
    ).populate("soilType");

    res.json({
      field: populated,
    });
  };

  removeAssociate = async (req: AuthRequest, res: Response): Promise<void> => {
    const { fieldId, email } = req.params;

    const field = await Field.findById(fieldId);

    if (!field) {
      res.status(404).end();
      return;
    }

    field.associates = field.associates.filter((e: string) => e !== email);
    await field.save();

    const populated = await (
      await field.populate("cropType")
    ).populate("soilType");

    res.json({
      field: populated,
    });
  };

  getParams = async (req: AuthRequest, res: Response): Promise<void> => {
    const { fieldId } = req.params;

    const field = await Field.findById(fieldId);
    if (!field) {
      res.sendStatus(404);
      return;
    }

    const params = await SoilCrop.findOne({
      crop: field.cropType.toString(),
      soil: field.soilType.toString(),
    })
      .populate("crop")
      .populate("soil");

    if (!params) {
      res.sendStatus(404);
      return;
    }

    res.json({
      params,
    });
  };

  addDevice = async (req: AuthRequest, res: Response): Promise<void> => {
    const fieldId = req.params.fieldId as string;
    const { serieId } = req.body;
    const { userId } = req;

    const field = await Field.findById(fieldId);
    if (!field) {
      res.status(404).json({ message: "Campo não encontrado" });
      return;
    }

    // Verificar se o device existe
    const device = await Device.findOne({ serieId });
    if (!device) {
      res.status(404).json({ message: "Dispositivo não encontrado" });
      return;
    }

    // Associar device ao field
    device.fieldId = new Types.ObjectId(fieldId);
    device.userId = userId;
    await device.save();

    const devices = await Device.find({ fieldId: new Types.ObjectId(fieldId) });

    res.json({
      field,
      devices,
    });
  };
}

export const fieldsController = new FieldsController();
