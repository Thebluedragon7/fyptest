import { Express } from "express";
import authRoutes from "./authentication/auth.routes";
import apiRoutes from "./api/api.routes";
import adminDashboardRoutes from "./admin/admin.routes";
import { authenticateToken } from "./utils/auth/authenticate";

function router(server: Express) {
  // API
  server.use("/api", authenticateToken, apiRoutes);

  // Auth
  server.use("/auth", authRoutes);

  // Admin Dashboard
  server.use("/admin", adminDashboardRoutes);
}

export default router;
