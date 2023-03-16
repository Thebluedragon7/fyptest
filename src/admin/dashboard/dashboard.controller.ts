import { Request, Response } from "express";

export default {
  get: async (req: Request, res: Response) => {
    res.render("index");
  },
  login: async (req: Request, res: Response) => {
    res.render("login");
  },
  logout: async (req: Request, res: Response) => {},
  other: (req: Request, res: Response) => {
    const method = req.method;
    res.status(405).json({
      success: false,
      message: `${method} not allowed`,
    });
  },
};
