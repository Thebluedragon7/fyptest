import { Request, Response } from "express";
import prisma from "../../../data/data-source/prisma";

export default {
  get: async (req: Request, res: Response) => {
    const tokens = await prisma.token.findMany();

    res.render("token/table", {
      tokens: tokens,
    });
  },
  delete: async (req: Request, res: Response) => {
    const tokenId = req.params.id;

    const token = await prisma.token.delete({
      where: {
        id: tokenId,
      },
    });

    if (!token) {
      res.status(500);
    }

    res.status(204);
  },
  other: (req: Request, res: Response) => {
    const method = req.method;
    res.status(405).json({
      success: false,
      message: `${method} not allowed`,
    });
  },
};
