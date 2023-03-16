import express from "express";
const router = express.Router();
import controller from "./token.controller";

router.get("/", controller.get);
router.delete("/delete/:id", controller.delete);
router.all("/", controller.other);

export default router;
