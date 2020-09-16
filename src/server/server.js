import "./db";
import "./passport";
import api from "./routes/index";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import morgan from "morgan";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const CookieStore = MongoStore(session);
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("common"));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log("req.session", req.session);
  return next();
});
app.use("/api", api);
app.listen(3001, () => console.log("Server is running on port 3001"));
