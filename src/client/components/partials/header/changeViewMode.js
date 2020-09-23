import React from "react";
import styled, { css } from "styled-components";

const ModeBtnBox = styled.div`
  display: grid;
  width: 52px;
  height: 20px;
  grid-template-columns: repeat(2, 1fr);
  ${(props) =>
    !props.currentUser &&
    css`
      margin-right: 10%;
    `}
`;

const ModeButton = styled.button`
  all: unset;
  width: 26px;
  height: 100%;
  font-size: 5px;
  text-align: center;
  padding: 0;

  ${(props) => {
    const { mode, theme, day } = props;
    if (mode === "day") {
      return day
        ? css`
            background: ${theme[mode].light};
            color: "white";
          `
        : css`
            background: ${theme[mode].dark};
            color: ${theme[mode].dark};
          `;
    }
    return day
      ? css`
          background: ${theme[mode].dark};
          color: ${theme[mode].dark};
        `
      : css`
          background: ${theme[mode].light};
          color: "white";
        `;
  }};
`;
function ChangeViewMode({ changeMode, currentUser, ...rest }) {
  function handleClick(event) {
    event.persist();
    changeMode(event.currentTarget.id);
  }
  return (
    <ModeBtnBox currentUser={currentUser}>
      <ModeButton day id="day" {...rest} onClick={handleClick}>
        day
      </ModeButton>
      <ModeButton night id="night" {...rest} onClick={handleClick}>
        night
      </ModeButton>
    </ModeBtnBox>
  );
}
export default ChangeViewMode;
