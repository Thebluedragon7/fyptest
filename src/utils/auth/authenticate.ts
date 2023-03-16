import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IUserProp {
  id: string;
}

const generateAccessToken = (user: IUserProp) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "30m",
  });
};

const generateRefreshToken = (user: IUserProp) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET!);
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Un-authorized",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) return res.status(403);
    // @ts-ignore
    req.user = user;
    next();
  });
};

const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/admin/login");
};

const isNotAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return res.redirect("/admin/dashboard");
  }

  next();
};

export {
  generateAccessToken,
  generateRefreshToken,
  authenticateToken,
  authenticateAdmin,
  isNotAuthenticated,
};
