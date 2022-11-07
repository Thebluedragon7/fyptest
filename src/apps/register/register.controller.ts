import { Request, Response } from "express";
import prisma from "../../data/data-source/prisma";
import bcrypt from "bcrypt";

export default {
  post: async (req: Request, res: Response) => {
    const registerFormData: HumanFormDataInterface = req.body;

    // Salt Generation
    const salt = await bcrypt.genSalt();

    // Creating hashed password from salt
    const hashedPassword = await bcrypt.hash(registerFormData.password, salt);

    prisma.human.create({
      data: {
        name: registerFormData.name,
        age: registerFormData.age,
        email: registerFormData.email,
        phone: registerFormData.phone,
        password: hashedPassword,
      },
    });
  },
  other: (req: Request, res: Response) => {},
};
