import { Request, Response } from "express";
import prisma from "../../data/data-source/prisma";

// null, undefined, 0, false => Falsy Value | false

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
  post: async (req: Request, res: Response) => {},
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
