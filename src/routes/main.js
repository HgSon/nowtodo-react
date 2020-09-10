import React from "react";
import { LinkBtns } from "../components/partials/buttons";
import Weather from "../components/partials/weather";

class Main extends React.Component {
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
