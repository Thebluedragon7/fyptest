import express, { Request, Response, NextFunction } from "express";
import dashboardRoutes from "./dashboard/dashboard.routes";
import passport from "passport";
import {
  authenticateAdmin,
  isNotAuthenticated,
} from "../utils/auth/authenticate";

const router = express.Router();

router.use("/dashboard", authenticateAdmin, dashboardRoutes);

router.get(
  "/login",
  isNotAuthenticated,
  async (req: Request, res: Response) => {
    res.render("login", {
      layout: false,
    });
  }
);

router.get(
  "/register",
  isNotAuthenticated,
  async (req: Request, res: Response) => {
    res.render("register", {
      layout: false,
    });
  }
);

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/admin/dashboard",
    failureRedirect: "/admin/login",
    failureFlash: true,
  })
);

router.delete("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/admin/login");
  });
});
export default router;
