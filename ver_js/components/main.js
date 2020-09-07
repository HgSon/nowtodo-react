import { getLocation } from "./location.js";
import signupContainer from "./signup.js";
import { mainWeatherPresenter } from "./weather.js";

const mainPresenter = async () => {
  const buttons = document.createElement("form");
  const signUp = document.createElement("button");
  const logIn = document.createElement("button");
  signUp.id = "signUp";
  logIn.id = "logIn";
  signUp.innerHTML = "새 이름";
  logIn.innerHTML = "로그인";
  const handleSignSubmit = (e) => {
    e.preventDefault();
    const purpose = e.submitter.id;
    signupContainer();
    // 해야하나?? url달라지는 목적..
    // location.hash = purpose;

    //구조 다시짤필요?? 일단 돌아가게..
  };
  buttons.addEventListener("submit", handleSignSubmit);
  //append elements
  mainWrap.insertAdjacentElement("beforeEnd", buttons);
  buttons.append(signUp, logIn);
};
const mainContainer = async () => {
  todoWrap.style.display = "none";
  const body = document.querySelector("body");
  const mainWrap = document.createElement("div");
  mainWrap.id = "mainWrap";
  body.append(mainWrap);
  getLocation(false); //구조이상한데..
  //Location=> 날씨 미리해놓고 presenter 쓰는걸로

  return mainPresenter();
};

export default mainContainer;
