import { Router } from "express";
import adRoutes from "./ad.routes";
import favoriteRoutes from "./favorite.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const routes = Router();

routes.use("/ads", adRoutes);
routes.use("/favorites", favoriteRoutes);
routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);

export default routes;