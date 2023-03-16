import express from "express";
const router = express.Router();
import controller from "./user.controller";

router.get("/", controller.get);
router.get("/create", controller.create);
router.post("/create", controller.createUser);
router.patch("/update", controller.update);
router.delete("/delete", controller.delete);
router.all("/", controller.other);

export default router;
