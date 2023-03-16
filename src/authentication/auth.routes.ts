import express from "express";
const router = express.Router();
import controller from "./auth.controller";

router.post("/login", controller.login);
router.post("/register", controller.register);
router.delete("/logout", controller.logout);
router.post("/token", controller.token);
router.all("/", controller.other);

export default router;
