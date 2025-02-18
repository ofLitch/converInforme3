import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
//import taksRoutes from "./routes/tasks.routes.js";
//import { FRONTEND_URL } from "./config.js";

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use("/api",authRoutes);

export default app;