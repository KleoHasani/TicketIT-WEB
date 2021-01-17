import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { IoKeyOutline } from "react-icons/io5/index";

import { unauthAction } from "../store/actions/authActions";
import { ViewHeader } from "../components/ViewHeader";

function Account(props) {
  const dispatch = useDispatch();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

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
        console.log(err);
        alert("Ooops, looks like something went wrong");
      });
  };

  useEffect(onLoad, [firstname, lastname, email]);

  const handleLogout = (e) => {
    e.preventDefault();
    if (global.confirm("Are you sure?"))
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
          console.log(err);
          alert("Ooops, looks like something went wrong");
        });
    return;
  };

  return (
    <div className="view">
      <ViewHeader title="Account" />
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

        <button onClick={handleLogout}>
          <IoKeyOutline className="icon" />
        </button>
      </div>
    </div>
  );
}

export { Account };
