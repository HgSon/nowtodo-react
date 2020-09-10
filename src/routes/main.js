import React from "react";
import { LinkBtns } from "../components/partials/buttons";
import Weather from "../components/partials/weather";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    fetch("http://localhost:3001/api", {
      method: "POST",
      body: JSON.stringify({ testnow: "newtest" }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
