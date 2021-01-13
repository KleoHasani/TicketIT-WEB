import { Link } from "react-router-dom";

import {
  IoPaperPlaneOutline,
  IoPeopleOutline,
  IoPersonOutline,
} from "react-icons/io5/index";

function Navigation() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/projects">
            <IoPaperPlaneOutline className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/team">
            <IoPeopleOutline className="icon" />
          </Link>
        </li>
        <li>
          <Link to="/account">
            <IoPersonOutline className="icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export { Navigation };
