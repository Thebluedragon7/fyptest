import { Request, Response } from "express";
import prisma from "../../data/data-source/prisma";

export default {
  get: async (req: Request, res: Response) => {
    const cars = await prisma.car.findMany({
      where: {
        // @ts-ignore
        humanId: req.user.id,
      },
    });

    res.status(200).json(cars);
  },
  getById: async (req: Request, res: Response) => {
    const carId = req.params.id;
    // @ts-ignore
    const humanId = req.user.id;
    const cars = await prisma.car.findMany({
      where: {
        humanId: humanId,
      },
    });

    const filteredCar = cars.filter((car) => car.id === carId);

    if (!filteredCar) {
      res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      ...filteredCar,
    });
  },
  post: async (req: Request, res: Response) => {
    const carForm: CarFormDataInterface = req.body;

    const car = await prisma.car.create({
      data: {
        name: carForm.name,
        model: carForm.model,
        humanId: carForm.humanId,
      },
    });

    if (!car) {
      res.status(500).json({
        message: "Item Cannot be created, please try again",
      });
    }

    res.status(201).json(car);
  },
  delete: async (req: Request, res: Response) => {
    const carId = req.params.id;

    const car = await prisma.car.delete({
      where: {
        id: carId,
      },
    });

    if (!car) {
      res.status(500).json({
        message: "Car Cannot be created, please try again",
      });
    }

    res.status(204);
  },
  patch: async (req: Request, res: Response) => {
    const carForm: CarFormDataInterface = req.body;
    const { carId } = req.params;

    const car = await prisma.car.update({
      where: {
        id: carId,
      },
      data: {
        name: carForm.name,
        model: carForm.model,
        humanId: carForm.humanId,
      },
    });

    if (!car) {
      res.status(500).json({
        message: "Car cannot be updated!",
      });
    }

    res.status(200).json({
      message: "Car updated Successfully!",
    });
  },
  other: (req: Request, res: Response) => {
    const method = req.method;
    res.status(405).json({
      success: false,
      message: `${method} not allowed`,
    });
  },
};
