const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const routes = require("./routes");
const errorHandler = require("./middleware/error.middleware");

const app = express();

const isProduction = process.env.NODE_ENV === "production";

app.set("trust proxy", 1);

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please try again later."
    });
  },
  skip: (req) => req.path === "/health", 
});

app.use(compression());

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://justbuy-ten.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

if (isProduction) {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api", globalLimiter, routes);

app.use(errorHandler);

module.exports = app;