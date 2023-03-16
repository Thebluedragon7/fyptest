import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../../data/data-source/prisma";

export default {
  get: async (req: Request, res: Response) => {
    const humans = await prisma.human.findMany({
      include: {
        car: true,
      },
    });
    res.render("human/table", {
      humans: humans,
    });
  },
  create: async (req: Request, res: Response) => {
    res.render("human/create");
  },
  createHuman: async (req: Request, res: Response) => {
    const humanForm = req.body;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(humanForm.password, salt);

    const human = await prisma.human.create({
      data: {
        name: humanForm.name,
        age: parseInt(humanForm.age),
        email: humanForm.email,
        phone: humanForm.phone,
        password: hashedPassword,
        verified: !!humanForm.verified,
      },
    });

    if (!human) {
      res.status(500).send("Something Went Wrong");
    }

    res.redirect("/admin/dashboard/human");
  },
  update: async (req: Request, res: Response) => {},
  delete: async (req: Request, res: Response) => {},
  other: (req: Request, res: Response) => {
    const method = req.method;
    res.status(405).json({
      success: false,
      message: `${method} not allowed`,
    });
  },
};
