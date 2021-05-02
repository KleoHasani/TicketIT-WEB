import { NavLink as Link } from "react-router-dom";

import {
  IoPaperPlaneOutline,
  IoPersonOutline,
} from "react-icons/io5/index";

function Navigation(props) {
  return (
    <nav>
      <div>
        <Link to="/projects" activeClassName="active">
          <IoPaperPlaneOutline className="icon" />
        </Link>
      </div>
      <Link to="/account">
        <IoPersonOutline className="icon" />
      </Link>
    </nav>
  );
}

export { Navigation };
