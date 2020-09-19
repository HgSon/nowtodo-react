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
export const patchProjectList = async (req, res) => {
  const { targetId, changedTitle, completed } = req.body;
  console.log(targetId, changedTitle, completed);
  try {
    if (changedTitle) {
      await Project.update({ id: targetId }, { title: changedTitle });
      console.log("changetitle");
    }
    if (completed !== undefined) {
      await Project.update({ id: targetId }, { completed });
      console.log("change iscompleted");
    }
  } catch (err) {
    console.log(err);
  }
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

export const deleteProjectList = async (req, res) => {
  const id = req.url.split("/projects/")[1];
  try {
    const deleteTarget = await Project.findOne({ id });
    const sublist = deleteTarget.sublist;
    for (let subitem of sublist) {
      await Sublist.deleteOne({ _id: subitem });
    }
    await Project.deleteOne({ id });
  } catch (err) {
    console.log(err);
  }
  return;
};

export const getSubList = async (req, res) => {
  const { projectId } = req.params;
  let list = [];
  try {
    const project = await Project.findOne({ id: projectId }).populate(
      "sublist"
    );
    list = project.sublist;
  } catch (err) {
    console.error(err);
  } finally {
    res.send(list);
  }
};
export const postSubList = async (req, res) => {
  const {
    body: { title, id },
    params: { projectId },
  } = req;
  try {
    const project = await Project.findOne({ id: projectId });
    const newSublist = await Sublist.create({ title, id });
    project.sublist.push(newSublist._id);
    project.save();
  } catch (err) {
    console.error(err);
  } finally {
    return;
  }
};

export const patchSubList = async (req, res) => {
  const {
    body: { targetId, changedTitle, completed },
    params: { projectId },
  } = req;
  try {
    const project = await Project.findOne({ id: projectId }).populate(
      "sublist"
    );
    let changedSublist = [];
    if (changedTitle) {
      await Sublist.updateOne({ id: targetId }, { title: changedTitle });
      changedSublist = await project.sublist.map((todo) => {
        if (todo["id"] === targetId) {
          todo["title"] = changedTitle;
        }
        return todo;
      });
    }
    if (completed !== undefined) {
      await Sublist.updateOne({ id: targetId }, { completed });
      changedSublist = await project.sublist.map((todo) => {
        if (todo["id"] === targetId) {
          todo["completed"] = completed;
        }
        return todo;
      });
    }
    await Project.updateOne({ id: projectId }, { sublist: changedSublist });
  } catch (err) {
    console.log(err);
  }
};

export const deleteSubList = async (req, res) => {
  const id = req.url.split("/sublists/")[1];
  try {
    await Sublist.deleteOne({ id });
  } catch (err) {
    console.log(err);
  }
  return;
};

export const getUserList = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};
