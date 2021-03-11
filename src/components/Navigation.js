import { NavLink as Link } from "react-router-dom";

import {
  IoPaperPlaneOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from "react-icons/io5/index";

function Navigation(props) {
  return (
    <nav>
      <div>
        <Link to="/projects" activeClassName="active">
          <IoPaperPlaneOutline className="icon" />
        </Link>
        <Link to="/team">
          <div className="icon">
            <IoPeopleOutline className="icon" />
            {props.requestsCount > 0 ? <p>{props.requestsCount}</p> : null}
          </div>
        </Link>
      </div>
      <Link to="/account">
        <IoPersonOutline className="icon" />
      </Link>
    </nav>
  );
}

export { Navigation };
