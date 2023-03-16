import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../../../data/data-source/prisma";

export default {
  get: async (req: Request, res: Response) => {
    const users = await prisma.admin.findMany();

    res.render("user/table", {
      users: users,
    });
  },
  create: async (req: Request, res: Response) => {
    const users = await prisma.human.findMany();

    res.render("user/create", {
      users: users,
    });
  },
  createUser: async (req: Request, res: Response) => {
    const userForm = req.body;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(userForm.password, salt);

    const user = await prisma.admin.create({
      data: {
        username: userForm.name,
        password: hashedPassword,
      },
    });

    if (!user) {
      res.status(500).send("Oops! Something Went Wrong!");
    }

    res.redirect("/admin/dashboard/user");
  },
  update: async (req: Request, res: Response) => {
    const adminId = req.params.id;
    const userForm = req.body;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(userForm.password, salt);

    await prisma.admin.update({
      where: {
        id: adminId,
      },
      data: {
        username: userForm.name,
        password: hashedPassword,
      },
    });
  },
  delete: async (req: Request, res: Response) => {
    const adminId = req.params.id;
    await prisma.admin.delete({
      where: {
        id: adminId,
      },
    });

    res.status(204);
  },
  other: (req: Request, res: Response) => {
    const method = req.method;
    res.status(405).send(`${method} not allowed`);
  },
};
