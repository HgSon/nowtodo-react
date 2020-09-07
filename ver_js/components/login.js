const loginContainer = () => {
  const body = document.querySelector("body");
  const loginWrap = document.createElement("div");
  const submitInfo = document.createElement("form");
  const myName = document.createElement("input");
  myName.type = "text";
  myName.id = "myName";
  const nameLabel = document.createElement("label");
  nameLabel.for = "myName";
  nameLabel.innerHTML = "이름";
  const myPw = document.createElement("input");
  myPw.type = "password";
  myPw.id = "myPw";
  const pwLabel = document.createElement("label");
  pwLabel.for = "myPw";
  pwLabel.innerHTML = "비밀번호";
  const submit = document.createElement("input");
  submit.type = "submit";
  const handleSubmitInfo = (e) => {
    e.preventDefault();
    console.log("로그인");
    //if localstorage members 에 동일 id x
    //name label.innerHTML = "존재하지 않는 이름입니다"
    //if password!==저장된 pw
    // "비밀번호가 일치하지 않습니다"
    //else =>
    // loginWrap.innerHTML = "어서오세요, id" => todolist with id
  };
  submitInfo.addEventListener("submit", handleSubmitInfo);

  //button 새아이디 a href = "/새아이디" : preventdefault()
  //button 메인으로 a href = "/" :preventDefault
};
const loginPresenter = () => {
  //로그인, 사인 거의 겹친다. 겹치는것 합치기?
};
export default loginContainer;
