import express from "express";
const router = express.Router();
import controller from "./human.controller";

router.get("/", controller.get);
router.get("/create", controller.create);
router.post("/create", controller.createHuman);
router.get("/update", controller.update);
router.get("/delete", controller.delete);
router.all("/", controller.other);

export default router;
