import express from "express";
import expressEjsLayouts from "express-ejs-layouts";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import router from "./router";
import passport from "passport";
import flash from "express-flash";
import session from "express-session";
import methodOverride from "method-override";
import initializePassport from "./utils/passport/passport-config";

const server = express();

initializePassport(passport);

server.use("/static", express.static("./public"));
server.use("/uploads", express.static("./protected"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(flash());
server.use(
  session({
    secret: process.env.SESSION_SECRET as string | string[],
    resave: false,
    saveUninitialized: false,
  })
);
server.use(passport.initialize());
server.use(passport.session());
server.use(methodOverride("_method"));
server.use(cors());
server.use(morgan(":method :url :status :user-agent - :response-time ms"));
server.use(helmet());
server.use(expressEjsLayouts);
server.set("layout", "layouts/layout");
server.set("view engine", "ejs");

router(server);

export default server;
