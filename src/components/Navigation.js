import { useDispatch } from "react-redux";
import axios from "axios"
import { Link } from "react-router-dom";

import {
  IoPaperPlaneOutline,
  IoConstructOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoKeyOutline,
} from "react-icons/io5/index";

import { unauthAction } from "../store/actions/authActions";


function Navigation() {
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    axios({
      method: "delete",
      baseURL: "http://localhost:8000/api",
      url: "/auth/logout",
      headers: {authorization: sessionStorage.getItem("authorization")}
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          sessionStorage.clear();
          dispatch(unauthAction);
        } else alert(response.data.msg);
      })
      .catch((err) => {
        console.log(err);
        alert("Ooops, looks like something went wrong");
      });
  }

  return (
      <nav>
        <ul>
          <li>
            <Link to="/dashboard">
              <IoPaperPlaneOutline class="icon"/>
            </Link>
          </li>
          <li>
            <Link to="/projects">
              <IoConstructOutline class="icon" />
            </Link>
          </li>
          <li>
            <Link to="/teams">
              <IoPeopleOutline class="icon" />
            </Link>
          </li>
          <li>
            <Link to="/account">
              <IoPersonOutline class="icon" />
            </Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/" onClick={handleLogout} >
              <IoKeyOutline class="icon" />
            </Link>
          </li>
        </ul>
      </nav>
  );
}

export { Navigation };