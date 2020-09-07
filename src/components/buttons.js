import React from "react";
import routes from "../routes";
import { Link } from "react-router-dom";

export default (props) => {
  return (
    <div>
      {props.links.map((link) => (
        <Link key={link} to={routes[link]}>
          {link}
        </Link>
      ))}
    </div>
  );
};
