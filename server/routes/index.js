import express from "express";
import { getSignup, postSignup, test } from "../controller/controllers";
const router = express.Router();

router.post("/", test);
// router.get("/project", getUsersProjects);
// router.post("/project", postUsersProjects);
router.get("/signup", getSignup);
router.post("/signup", postSignup);
// router.post("/login", postLogin);

export default router;
