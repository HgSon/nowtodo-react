// islogin 여기서 가져오기

const signupContainer = () => {
  const body = document.querySelector("body");
  const signupWrap = document.createElement("div");
  const submitInfo = document.createElement("form");
  const newName = document.createElement("input");
  newName.type = "text";
  newName.id = "newName";
  const nameLabel = document.createElement("label");
  nameLabel.for = "newName";
  nameLabel.innerHTML = "이름";
  const newPw = document.createElement("input");
  newPw.type = "password";
  newPw.id = "newPw";
  const newPwConfirm = document.createElement("input");
  newPwConfirm.type = "password";
  newPwConfirm.id = "newPwConfirm";
  const pwLabel = document.createElement("label");
  pwLabel.for = "newPw";
  pwLabel.innerHTML = "비밀번호";
  const pwCfLabel = document.createElement("label");
  pwCfLabel.for = "newPwConfirm";
  pwCfLabel.innerHTML = "비밀번호 확인";
  const submit = document.createElement("input");
  submit.type = "submit";
  const handleSubmitInfo = (e) => {
    e.preventDefault();
    console.log(e);
    //if localstorage members 에 동일 id
    //name label.innerHTML = "사용 중인 이름입니다"
    //if password!==password
    //submitInfo.innerHTML
    //else setlocalstorage {id, pw}
    // signupWrap.innerHTML = "환영합니다, id" => todolist with id
  };
  submitInfo.addEventListener("submit", handleSubmitInfo);

  mainWrap.remove();
  body.prepend(signupWrap);
  signupWrap.append(submitInfo);
  submitInfo.append(
    nameLabel,
    newName,
    pwLabel,
    newPw,
    pwCfLabel,
    newPwConfirm,
    submit
  );
  const goLogin = document.createElement("a");
  goLogin.href = "/logIn";
  goLogin.innerHTML = "로그인";
  const goMain = document.createElement("a");
  goMain.href = "/";
  goMain.innerHTML = "메인으로";
  //preventdefault. get.
  submitInfo.after(goLogin, goMain);
};
const signupPresenter = () => {};

export default signupContainer;
