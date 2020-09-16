import express from "express";
import {
  postSignup,
  postLogin,
  patchProjectList,
  postProjectList,
  getProjectList,
} from "../controller/controllers";
import { serverRoutes } from "../../routes";
import "../passport";

const router = express.Router();

router.post(serverRoutes.signup, postSignup);
router.post(serverRoutes.login, postLogin, (req, res) =>
  res.send({ currentUser: req.body.userName })
);
router.get(serverRoutes.project, getProjectList);
router.post(serverRoutes.project, postProjectList);
router.patch(serverRoutes.project, patchProjectList);

// router.get(serverRoutes.project, getList);
// router.get(serverRoutes.sublist, getList);
// router.patch(serverRoutes.sublist, patchList);

export default router;
