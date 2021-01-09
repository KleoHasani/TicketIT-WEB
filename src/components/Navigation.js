import { useDispatch } from "react-redux";
import axios from "axios"
import {
  IoMenuOutline,
  IoAlbumsOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoKeyOutline,
} from "react-icons/io5/index";
import { Link } from "react-router-dom";

import { unauthAction } from "../store/actions/authActions";

function Navigation(props) {
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
    <nav className="side-nav fill primary">
      <ul>
        <li className="p-1">
          <Link to="/dashboard">
            <p>Dashboard</p>
            <IoMenuOutline className="icon ai-sz-normal" />
          </Link>
        </li>
        <li className="p-1-left p-1-right p-1-bottom">
          <Link to="/projects">
            <p>Projects</p>
            <IoAlbumsOutline className="icon ai-sz-normal" />
          </Link>
        </li>
        <li className="p-1-left p-1-right p-1-bottom">
          <Link to="/teams">
            <p>Team</p>
            <IoPeopleOutline className="icon ai-sz-normal" />
          </Link>
        </li>
        <li className="p-1-left p-1-right p-1-bottom">
          <Link to="/account">
            <p>Account</p>
            <IoPersonOutline className="icon ai-sz-normal" />
          </Link>
        </li>
      </ul>
      <ul>
        <li className="p-1">
          <Link to="/" onClick={handleLogout} >
            <p>Logout</p>
            <IoKeyOutline className="icon ai-sz-normal" />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export { Navigation };