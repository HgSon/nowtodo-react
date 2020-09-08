import api from "./routes/index";
import express from "express";
import cors from "cors";
// // import "./db";

const app = express();
app.use(cors());
app.use("/api", api);
app.listen(3001, () => console.log("Server is running on port 3001"));
