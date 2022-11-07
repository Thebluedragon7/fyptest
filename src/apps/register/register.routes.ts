import express from "express";
const router = express.Router();
import controller from "./register.controller";

router.post("/", controller.post);
router.all("/", controller.other);

export default router;
