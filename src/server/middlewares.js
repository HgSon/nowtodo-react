export const localsMiddleware = (req, res, next) => {
  res.locals.userName = req.userName;
  next();
};

//필요한가? 로그인할때도 쓰려면 이편이 편한가?
//근데 send userName하니까 간단했던거같은..
