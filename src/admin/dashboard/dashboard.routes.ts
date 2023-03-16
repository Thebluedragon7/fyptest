import express, { Request, Response } from "express";
const router = express.Router();
import controller from "./dashboard.controller";
import humanRoutes from "./human/human.routes";
import carRoutes from "./car/car.routes";
import tokenRoutes from "./token/token.routes";
import userRoutes from "./user/user.routes";

router.get("/", (req: Request, res: Response) => {
  res.render("index");
});
router.use("/human", humanRoutes);
router.use("/car", carRoutes);
router.use("/token", tokenRoutes);
router.use("/admin", userRoutes);
router.all("/", controller.other);

export default router;
