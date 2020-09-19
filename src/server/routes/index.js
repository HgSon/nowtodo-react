import express from "express";
import {
  postSignup,
  postLogin,
  patchProjectList,
  postProjectList,
  getProjectList,
  deleteProjectList,
  getSubList,
  postSubList,
  patchSubList,
  deleteSubList,
  getUserList,
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
router.patch(`${serverRoutes.project}/:projectId`, patchProjectList);
router.delete(`${serverRoutes.project}/:projectId`, deleteProjectList);

router.get(serverRoutes.sublist, getSubList);
router.post(serverRoutes.sublist, postSubList);
router.patch(`${serverRoutes.sublist}/:sublistId`, patchSubList);
router.delete(`${serverRoutes.sublist}/:sublistId`, deleteSubList);

router.get(serverRoutes.users, getUserList);
export default router;
