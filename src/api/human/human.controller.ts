import { Request, Response } from "express";
import prisma from "../../data/data-source/prisma";
import bcrypt from "bcrypt";

export default {
  get: async (req: Request, res: Response) => {
    const humans = await prisma.human.findMany();
    res.status(200).json({
      success: true,
      ...humans,
    });
  },
  getById: async (req: Request, res: Response) => {
    const humanId = req.params.id;
    const human = await prisma.human.findUnique({
      where: {
        id: humanId,
      },
    });

    if (!human) {
      res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      ...human,
    });
  },
  post: async (req: Request, res: Response) => {
    const registerFormData: HumanFormDataInterface = req.body;

    // Salt Generation
    const salt = await bcrypt.genSalt();

    // Creating hashed password from salt
    const hashedPassword = await bcrypt.hash(registerFormData.password, salt);

    const human = await prisma.human.create({
      data: {
        name: registerFormData.name,
        age: registerFormData.age,
        email: registerFormData.email,
        phone: registerFormData.phone,
        password: hashedPassword,
      },
    });

    if (!human) {
      res.status(500).json({
        message: "Some errors were encountered, please try again",
      });
    }

    res.status(201).json({
      message: "Human Successfully Registered!",
    });
  },
  delete: async (req: Request, res: Response) => {},
  patch: async (req: Request, res: Response) => {},
  other: (req: Request, res: Response) => {
    const method = req.method;
    res.status(405).json({
      success: false,
      message: `${method} not allowed`,
    });
  },
};
