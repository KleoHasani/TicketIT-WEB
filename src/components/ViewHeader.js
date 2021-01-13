import { Fragment } from "react";

function ViewHeader(props) {
  return (
    <Fragment>
      <header>
        <h2>{props.title}</h2>
      </header>
      <hr />
    </Fragment>
  );
}

export { ViewHeader };
