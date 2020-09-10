import User from "../models/user";

export const postSignup = async (req, res, next) => {
  const {
    body: { userName, password },
  } = req;
  try {
    const user = await User({ name: userName });
    await User.register(user, password);
    res.send({ currentUser: userName });
  } catch (error) {
    console.log(error);
    if (error["name"] === "UserExistsError") {
      res.send({ idError: "이미 등록된 아이디입니다" });
    }
  }
};
