import todo from "./components/todo.js";
import main from "./components/main.js";
// import { getLocation } from "./components/location.js";
// import app from "./app.js";
// import dotenv from "dotenv";
// dotenv.config();

(function () {
  const nowLogin = 12121;
  // test.style.backgroundImage = "url(../assets/bgImg/Ash_0)";
  // const nowLogin = localStorage.getItem("nowLogin");
  nowLogin ? todo(nowLogin) : main();
})();

//localstorage
//member: {id: pw}, {id: pw}
//nowLogin: id

//html에 todoWrap있어서 input 보임
