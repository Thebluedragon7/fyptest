import express from "express";
const router = express.Router();
import controller from "./login.controller";

router.post("/", controller.post);
router.all("/", controller.other);

export default router;
