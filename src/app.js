import express from "express";
import cors from "cors";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import cookieParser from "cookie-parser";
//import taksRoutes from "./routes/tasks.routes.js";
//import { FRONTEND_URL } from "./config.js";

const app = express();
app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.1.11:5173'], // Agrega los orígenes permitidos
  credentials: true, // Para permitir cookies o encabezados de autenticación
}));


app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", notesRoutes);

export default app;
