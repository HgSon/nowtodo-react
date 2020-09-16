import React from "react";
import { clientRoutes } from "../../../routes";
import { Link } from "react-router-dom";

export const LinkBtns = (props) => {
  return (
    <div>
      {props.links.map((link) => (
        <Link key={link} to={clientRoutes[link]}>
          {link}
        </Link>
      ))}
    </div>
  );
};

export function CompleteBtn(props) {
  return (
    <button onClick={props.toggleComplete}>
      {props.isCompleted ? <i className="fas fa-check" /> : null}
    </button>
  );
}
export function DeleteBtn(props) {
  function handleClick() {
    const target = props.removeTarget.current.innerHTML;
    props.removeList(target);
  }
  return (
    <button onClick={handleClick}>
      {/* <i className="far fa-trash-alt" /> */}
    </button>
  );
}
