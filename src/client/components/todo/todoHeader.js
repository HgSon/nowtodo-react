import { Link } from "react-router-dom";
import Weather from "../partials/weather/weather";
import React from "react";
import styled, { css } from "styled-components";
import ChangeViewMode from "../partials/changeViewMode";
import ChangeID from "../partials/changeID";

const Header = styled.header`
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${(props) => {
    const { mode, theme } = props;
    return css`
      background: ${theme[mode].main};
      color: ${theme["day"].back};
    `;
  }}
`;

const StyledDiv = styled.div`
  height: 20px;
  box-sizing: border-box;
  display: grid;
  align-items: start;
  grid-template-columns: 65px 40px 52px;
  column-gap: 10px;
  margin-right: 10px;
`;

function TodoHeader(props) {
  const { changeUser, changeMode, currentUser, mode, theme } = props;
  return (
    <Header mode={mode} theme={theme}>
      <Weather isTodo={true} />
      <StyledDiv>
        <ChangeID
          changeUser={changeUser}
          currentUser={currentUser}
          mode={mode}
          theme={theme}
        />
        <Link
          style={{
            height: "20px",
            color: "white",
            fontSize: "10px",
            fontWeight: "bold",
            lineHeight: "20px",
          }}
          to={{ pathname: "/", state: { mode } }}
        >
          Logout
        </Link>
        <ChangeViewMode changeMode={changeMode} mode={mode} theme={theme} />
      </StyledDiv>
    </Header>
  );
}

export default TodoHeader;
