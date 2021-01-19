import { Fragment } from "react";

function ViewHeader(props) {
  return (
    <div className="header">
      <div className="header-body">
        <h2 className="header-title">{props.title}</h2>
        <div className="header-children">{props.children}</div>
      </div>
      <hr />
    </div>
  );
}

export { ViewHeader };
