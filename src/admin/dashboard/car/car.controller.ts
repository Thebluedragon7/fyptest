import { Request, Response } from "express";
import prisma from "../../../data/data-source/prisma";

export default {
  get: async (req: Request, res: Response) => {
    const cars = await prisma.car.findMany({
      include: {
        Human: true,
      },
    });

    res.render("car/table", {
      cars: cars,
    });
  },
  create: async (req: Request, res: Response) => {
    const humans = await prisma.human.findMany();

    res.render("car/create", {
      humans: humans,
    });
  },
  createCar: async (req: Request, res: Response) => {
    const carForm = req.body;

    const car = await prisma.car.create({
      data: {
        name: carForm.name,
        model: carForm.model,
        humanId: carForm.human,
      },
    });

    if (!car) {
      res.status(500).send("Oops! Something Went Wrong!");
    }

    res.redirect("/admin/dashboard/car");
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
