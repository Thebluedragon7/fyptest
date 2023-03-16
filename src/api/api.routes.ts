import express, { Request, Response } from "express";
import humanRoutes from "./human/human.routes";
import carRoutes from "./car/car.routes";

const router = express.Router();

router.use("/human", humanRoutes);
router.use("/car", carRoutes);
router.all("/", async (req: Request, res: Response) => {
  res.status(404).json({
    message: "Page not found!",
  });
});

export default router;
