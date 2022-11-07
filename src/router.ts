import { Express } from "express";
import humanRoutes from "./apps/human/human.routes";
import loginRoutes from "./apps/login/login.routes";
import registerRoutes from "./apps/register/register.routes";

function router(server: Express) {
  server.use("/human", humanRoutes);
  server.use("/login", loginRoutes);
  server.use("/register", registerRoutes);
  // server.post("/register", async (req: Request, res: Response) => {
  //   const data: LoginBody = req.body;

  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(data.password, salt);

  //   database.push({
  //     username: data.username,
  //     password: hashedPassword,
  //   });
  //   console.log(database);

  //   res.status(201).json({
  //     hash: hashedPassword,
  //   });
  // });
  // server.post("/login", async (req: Request, res: Response) => {
  //   const loginBody: LoginBody = req.body;
  //   console.log(database);

  //   const data: LoginBody | undefined = database.find((obj) => {
  //     if (obj.username === loginBody.username) {
  //       return true;
  //     }
  //     return false;
  //   });

  //   try {
  //     const isCorrect = await bcrypt.compare(
  //       loginBody.password,
  //       data!.password
  //     );

  //     if (isCorrect) {
  //       return res.status(200).json({
  //         message: "Login Successful!",
  //       });
  //     }
  //     return res.status(403).json({
  //       message: "Incorrect Password!",
  //     });
  //   } catch {
  //     res.status(500);
  //   }
  // });
}

export default router;
