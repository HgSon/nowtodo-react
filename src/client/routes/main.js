import React from "react";
import { LinkBtns } from "../components/partials/buttons";
import Weather from "../components/partials/weather/weather";
import styled, { css } from "styled-components";
import ChangeViewMode from "../components/partials/header/changeViewMode";

const MainpageWrap = styled.div`
  width: 100%;
  height: 100vh;
  ${(props) => {
    const { theme, mode } = props;
    return mode === "day"
      ? css`
          background: ${theme[mode].main};
          color: ${theme[mode].paper};
        `
      : css`
          background: ${theme[mode].back};
          color: ${theme[mode].text};
        `;
  }}
  display: grid;
  grid-template-columns: 1fr 300px 1fr;
  grid-template-rows: 25% 1fr 30%;
  & > div:first-child {
    position: absolute;
    right: 5%;
    top: 20px;
  }
  & > main {
    grid-column: 2/3;
    grid-row: 2/3;
  }
`;

class Main extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { state },
    } = this.props;
    this.state = {
      mode: (state && state.mode) || "day",
    };
    this.changeMode = this.changeMode.bind(this);
  }
  changeMode(selectedMode) {
    this.setState({ mode: selectedMode });
  }
  render() {
    const { mode } = this.state;
    return (
      <MainpageWrap mode={mode}>
        <ChangeViewMode mode={mode} changeMode={this.changeMode} />
        <main>
          <Weather isTodo={false} />
          <LinkBtns mode={mode} width={"250px"} links={["signup", "login"]} />
        </main>
      </MainpageWrap>
    );
  }
}
export default Main;
