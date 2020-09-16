const MAIN = "/";
const LOGIN = "/login";
const SIGNUP = "/signup";
const TODO = "/todo";
const USER = "/:user";
// const PROJECT = "/project";
// const SUBLIST = "/sublist";
const PROJECT = "/:user/projects";
const SUBLIST = "/:user/sublists";

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
  user: USER,
};
