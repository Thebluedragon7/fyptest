import { Request, Response } from "express";
import prisma from "../../data/data-source/prisma";
import bcrypt from "bcrypt";

export default {
  post: async (req: Request, res: Response) => {
    const loginFormData: LoginFormDataInterface = req.body;

    const selectedHuman = await prisma.human.findUnique({
      where: {
        email: loginFormData.email,
      },
    });

    if (!selectedHuman) {
      res.status(500).json({
        message: "User does not exists",
      });
    }

    try {
      const isCorrect = await bcrypt.compare(
        loginFormData.password,
        selectedHuman!.password
      );
      if (isCorrect) {
        res.status(200).json({
          message: "Login Successful",
        });
      }
      res.status(403).json({
        message: "Incorrect Password",
      });
    } catch {
      res.status(500);
    }
  },
  other: (req: Request, res: Response) => {},
};
