import React from "react";
import { LinkBtns } from "../components/partials/buttons";
import Weather from "../components/partials/weather";
import { serverRoutes } from "../../routes";

class Main extends React.Component {
  async handleClick() {
    const url = `http://localhost:3001/api${serverRoutes.login}`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({ userName: "myname", password: "mypw" }),
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }
  render() {
    return (
      <div className="mainWrap">
        <button onClick={this.handleClick}>button</button>
        <Weather isTodo={false} />
        <div>
          <LinkBtns links={["signup", "login"]} />
          {/* 자동로그인 선택 / 다른걸로 로그인하기 */}
        </div>
      </div>
    );
  }
}
export default Main;
