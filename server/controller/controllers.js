import User from "../models/user";

export const test = (req, res) => {
  const { body } = req;
  console.log(body);
};
export const getSignup = async (req, res, next) => {
  const users = await User.find({});
};
export const postSignup = async (req, res, next) => {
  const {
    body: { userName, password },
  } = req;
  try {
    const user = await User({ name: userName });
    await User.register(user, password);
  } catch (error) {
    console.log(error);
    if (error["name"] === "UserExistsError") {
      req.body.idError = "이미 등록된 아이디입니다";
    }
  }
  // 위에 되나? 되면 currentUser 갖는 미들웨어 만들기
};
