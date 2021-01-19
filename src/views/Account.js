import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { IoKeyOutline } from "react-icons/io5/index";

import { unauthAction } from "../store/actions/authActions";
import { ViewHeader } from "../components/ViewHeader";
import { refresh } from "../helpers/refresh";

function Account() {
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const onLoad = () => {
      axios({
        method: "get",
        baseURL: "http://localhost:8000/api",
        url: `/user/account`,
        headers: { authorization: sessionStorage.getItem("authorization") },
      })
        .then((response) => {
          if (response.data.desc === "PASS") {
            setFirstname(response.data.data.firstname);
            setLastname(response.data.data.lastname);
            setEmail(response.data.data.email);
          } else alert(response.data.msg);
        })
        .catch((err) => {
          if (err.toString() === "Error: Request failed with status code 401") {
            refresh();
            return onLoad();
          }
        });
    };
    onLoad();
  }, []);

  const logout = () => {
    axios({
      method: "delete",
      baseURL: "http://localhost:8000/api",
      url: "/user/logout",
      headers: { authorization: sessionStorage.getItem("authorization") },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          sessionStorage.clear();
          dispatch(unauthAction);
        } else alert(response.data.msg);
      })
      .catch((err) => {
        if (err.toString() === "Error: Request failed with status code 401") {
          refresh();
          return logout();
        }
      });
  };

  const handleLogout = (e) => {
    e.preventDefault();
    if (global.confirm("Are you sure?")) logout();
    return;
  };

  return (
    <div className="view">
      <ViewHeader title="Account">
        <div onClick={handleLogout} className="button danger">
          <IoKeyOutline className="icon-sm" />
          Logout
        </div>
      </ViewHeader>
      <div className="account">
        <div className="account-data">
          <div className="data-place">
            <p>First Name: </p>
            <p>Last Name: </p>
            <p>Email: </p>
          </div>
          <div className="data-value">
            <p>{firstname}</p>
            <p>{lastname}</p>
            <p>{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Account };
