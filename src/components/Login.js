import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";
import { authAction } from "../store/actions/authActions";

function Login(props) {
  const dispatch = useDispatch();
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      baseURL: "http://localhost:8000/api",
      url: "/auth/login",
      data: {
        email: e.target.email.value,
        password: e.target.password.value,
      },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          sessionStorage.setItem(
            "authorization",
            response.headers["authorization"]
          );
          sessionStorage.setItem("refresh", response.headers["x-refresh"]);
          dispatch(authAction);
          setRedirect(true);
        } else alert(response.data.msg);
      })
      .catch((err) => {
        console.log(err);
        alert("Ooops, looks like something went wrong");
      });
  };

  if (redirect) return <Redirect to="/dashboard" />;

  return (
    <Fragment>
      <form
        autoComplete="off"
        className="d-flex flex-column p-2 justify-content-center absolute pos-top pos-bottom pos-left pos-right m-auto-x w-50"
        onSubmit={handleSubmit}
      >
        <h2 className="m-1">LOGIN</h2>
        <div className="d-flex flex-column">
          <label htmlFor="email" className="text-primary">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="p-05 border-b b-sz-1 primary text-secondary"
            required
          />
        </div>
        <div className="d-flex flex-column m-1-top">
          <label htmlFor="password" className="text-primary">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="p-05 border-b b-sz-1 primary text-secondary"
            required
          />
        </div>
        <button
          type="submit"
          className="d-block m-auto-x m-1-y fill primary pill p-05-x p-1-y w-100"
        >
          Login
        </button>
        <Link
          to="/register"
          className="text-primary text-center cursor-pointer m-1"
        >
          Need a new account? Register
        </Link>
      </form>
    </Fragment>
  );
}

export { Login };