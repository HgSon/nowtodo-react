const MAIN = "/";
const LOGIN = "/login";
const SIGNUP = "/signup";
const TODO = "/todo";
const USERS = "/users";
const PROJECT = "/:user/projects";
const SUBLIST = "/:projectId/sublists";

export const clientRoutes = {
  main: MAIN,
  login: LOGIN,
  signup: SIGNUP,
  todo: TODO,
};

export const serverRoutes = {
  login: LOGIN,
  signup: SIGNUP,
  project: PROJECT,
  sublist: SUBLIST,
  users: USERS,
};
