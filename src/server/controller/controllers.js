import User from "../models/user";
import Project from "../models/project";
import Sublist from "../models/sublist";
import passport from "passport";
import "../passport";

export const postSignup = async (req, res, next) => {
  const {
    body: { userName, password },
  } = req;
  try {
    const user = await User({ userName });
    await User.register(user, password);
    res.send({ currentUser: userName });
  } catch (error) {
    console.log(error);
    if (error["name"] === "UserExistsError") {
      res.send({ currentError: "이미 등록된 아이디입니다" });
    }
  }
  return;
};

export const postLogin = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (info && info.message === "Password or username is incorrect") {
      res.status(401).send({
        currentError: "존재하지 않는 아이디이거나 비밀번호가 일치하지 않습니다",
      });
    }
    if (!err && user && !info) {
      next();
    }
  })(req, res, next);
};

export const getProjectList = async (req, res) => {
  const { user } = req.params;
  let list = [];
  try {
    list = await Project.find({ user });
  } catch (err) {
    console.log(err);
  }
  res.send(list);
};
export const patchProjectList = (req, res) => {
  console.log(req.params);
};

export const postProjectList = async (req, res) => {
  const {
    params: { user },
    body: { title, id },
  } = req;
  try {
    await Project.create({ title, id, user });
  } catch (err) {
    console.log(err);
  }
  return;
};

export const deleteProjectList = async (req, res) => {};

//한번에 할수있도록 리팩토링
