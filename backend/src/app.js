import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cookieParser());

// ✅ Correct CORS configuration
app.use(cors({
  origin: "https://rent-motors.vercel.app", // Replace with your frontend URL
  credentials: true,
  methods: "GET, POST, PUT, PATCH, DELETE",
  allowedHeaders: "Content-Type, Authorization"
}));

// ✅ Handle Preflight Requests (OPTIONS method)
app.options("*", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "https://rent-motors.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.sendStatus(204);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
import authRouter from "./routes/auth.routes.js";
import renterRouter from "./routes/renter.routes.js";
import clientRouter from "./routes/client.routes.js";

// Routes declaration
app.get('/', (req, res) => {
  res.send('Hi, World! Welcome to Rent Motors');
});

app.use("/api/auth", authRouter);
app.use("/api/renter", renterRouter);
app.use("/api/client", clientRouter);

export { app };
