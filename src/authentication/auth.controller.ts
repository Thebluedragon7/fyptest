import { Request, Response } from "express";
import prisma from "../data/data-source/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/auth/authenticate";

interface RegisterAdminInterface {
  username: string;
  password: string;
}

export default {
  login: async (req: Request, res: Response) => {
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
        const user = {
          id: selectedHuman?.id!,
        };
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);
        await prisma.token.create({
          data: {
            refreshToken: refreshToken,
          },
        });
        res.status(200).json({
          message: "Login Successful",
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
      res.status(403).json({
        message: "Incorrect Password",
      });
    } catch {
      res.status(500);
    }
  },
  register: async (req: Request, res: Response) => {
    const registerAdminForm: RegisterAdminInterface = req.body;

    // Salt Generation
    const salt = await bcrypt.genSalt();

    // Creating hashed password from salt
    const hashedPassword = await bcrypt.hash(registerAdminForm.password, salt);

    const admin = await prisma.admin.create({
      data: {
        username: registerAdminForm.username,
        password: hashedPassword,
      },
    });

    if (!admin) {
      res.status(500).json({
        message: "Some Error were encountered, please try again!",
      });
    }

    res.status(201).json({
      message: "Registered Successfully",
    });
  },
  token: async (req: Request, res: Response) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const token = await prisma.token.findUnique({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!token) {
      res.status(403).json({
        message: "Forbidden",
      });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET!,
      (err: any, user: any) => {
        if (err)
          return res.status(403).json({
            message: "Forbidden",
          });
        const accessToken = generateAccessToken(user);
        res.status(200).json({
          accessToken: accessToken,
        });
      }
    );
  },
  logout: async (req: Request, res: Response) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
      return res.status(400).json({
        message: "Bad Request",
      });
    }
    const token = await prisma.token.delete({
      where: {
        refreshToken: refreshToken,
      },
    });
    if (!token) {
      return res.status(404).json({
        message: "Token not Found",
      });
    }
    res.status(204);
  },
  other: (req: Request, res: Response) => {
    res.status(403).json({
      message: `${req.method} not allowed!`,
    });
  },
};
