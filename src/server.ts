import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import router from "./router";

const server = express();

server.use("/uploads", express.static("./uploads"));
server.use(express.json());
server.use(cors());
server.use(morgan(":method :url :status :user-agent - :response-time ms"));
server.use(helmet());
router(server);

export default server;
