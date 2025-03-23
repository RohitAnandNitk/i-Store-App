import express from "express";
import colors from "colors";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
import Stripe from "stripe";
import helmet from "helmet";
import ExpressMongoSanitize from "express-mongo-sanitize";

// import routes
import testRoute from "./routes/testRoute.js";
import UserRoutes from "./routes/UserRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import CategoryRoutes from "./routes/CategoryRoutes.js";
import OrderRoutes from "./routes/OrderRoutes.js";

//congif dotenv
import dotenv from "dotenv";
dotenv.config();

// database connection
connectDB();

// stripe config
export const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

//cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

//rest object
const app = express();

// middleweres

app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

//route
app.use("/api/v1", testRoute);
app.use("/user", UserRoutes);
app.use("/product", ProductRoutes);
app.use("/category", CategoryRoutes);
app.use("/order", OrderRoutes);

//port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `server is running on ${PORT} on ${process.env.NODE_ENV} mode`.bgMagenta
      .white
  );
});
