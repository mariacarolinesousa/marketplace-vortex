import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      process.env.FRONTEND_URL,
    ].filter(Boolean) as string[],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  return res.status(200).json({
    message: "API do ReCampus funcionando!",
  });
});

app.use(routes);

export default app;