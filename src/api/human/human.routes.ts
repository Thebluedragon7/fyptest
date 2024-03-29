import express from "express";
const router = express.Router();
import controller from "./human.controller";

router.get("/", controller.get);
router.get("/:id", controller.getById);
router.post("/", controller.post);
router.delete("/:id", controller.delete);
router.patch("/:id", controller.patch);
router.all("/", controller.other);

export default router;
