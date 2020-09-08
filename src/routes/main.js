import React from "react";
import { LinkBtns } from "../components/buttons";
import Weather from "../components/weather";

class Main extends React.Component {
  state = { id: null, list: null };
  componentDidMount() {
    fetch("http://localhost:3001/api")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }
  render() {
    return (
      <div className="mainWrap">
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
