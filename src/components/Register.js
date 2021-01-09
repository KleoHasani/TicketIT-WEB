import axios from "axios";
import { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

function Register(props) {
  const [redirect, setRedirect] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      baseURL: "http://localhost:8000/api",
      url: "/auth/register",
      data: {
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
        email: e.target.email.value,
        password: e.target.password.value,
      },
    })
      .then((response) => {
        if (response.data.desc === "PASS") setRedirect(true);
        else alert(response.data.msg);
      })
      .catch((err) => {
        console.log(err);
        alert("Ooops, looks like something went wrong");
      });
  };

  if (redirect) return <Redirect to="/" />;

  return (
    <Fragment>
      <form
        autoComplete="off"
        className="d-flex flex-column p-2 justify-content-center absolute pos-top pos-bottom pos-left pos-right m-auto-x w-50"
        onSubmit={handleSubmit}
      >
        <h2 className="m-1">REGISTER</h2>
        <div className="d-flex flex-column">
          <label htmlFor="firstname" className="text-primary">
            First Name
          </label>
          <input
            type="text"
            name="firstname"
            className="p-05 border-b b-sz-1 primary text-secondary"
            required
          />
        </div>
        <div className="d-flex flex-column m-1-top">
          <label htmlFor="lastname" className="text-primary">
            Last Name
          </label>
          <input
            type="text"
            name="lastname"
            className="p-05 border-b b-sz-1 primary text-secondary"
            required
          />
        </div>

        <div className="d-flex flex-column m-1-top">
          <label htmlFor="email" className="text-primary">
            Email
          </label>
          <input
            type="email"
            name="email"
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
            className="p-05 border-b b-sz-1 primary text-secondary"
            required
          />
          <small className="text-secondary m-05-top">
            <span className="text-danger">* </span>
            Password must be 8 or more characters
          </small>
        </div>
        <button
          type="submit"
          className="d-block m-auto-x m-1-y fill primary pill p-05-x p-1-y w-100"
        >
          Register
        </button>
        <Link to="/" className="text-primary text-center cursor-pointer m-1">
          Already have an account? Login
        </Link>
      </form>
    </Fragment>
  );
}

export { Register };