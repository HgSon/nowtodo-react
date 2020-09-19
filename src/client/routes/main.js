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
        </div>
      </div>
    );
  }
}
export default Main;
