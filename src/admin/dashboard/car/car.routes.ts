import express from "express";
const router = express.Router();
import controller from "./car.controller";

router.get("/", controller.get);
router.get("/create", controller.create);
router.post("/create", controller.createCar);
router.get("/update", controller.update);
router.get("/delete", controller.delete);
router.all("/", controller.other);

export default router;
