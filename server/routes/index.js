import express from "express";
import { testDB, test } from "../db";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(test);
});

module.exports = router;
