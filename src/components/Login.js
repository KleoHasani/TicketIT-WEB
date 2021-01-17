import { useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";
import { authAction } from "../store/actions/authActions";
import { useState } from "react";

function Login(props) {
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

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

  if (redirect) return <Redirect to="/projects" />;

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="form">
      <h1>LOGIN</h1>
      <input
        type="email"
        name="email"
        id="email"
        required
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        id="password"
        required
        placeholder="Password"
      />
      <button type="submit">Login</button>
      <Link to="/register">Need a new account? Register</Link>
    </form>
  );
}

export { Login };
