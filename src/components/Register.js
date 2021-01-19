import axios from "axios";
import { useState } from "react";
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

  if (redirect) return <Redirect to="/login" />;

  return (
    <form autoComplete="off" onSubmit={handleSubmit} className="form">
      <h1>REGISTER</h1>
      <input type="text" name="firstname" required placeholder="First Name" />
      <input type="text" name="lastname" required placeholder="Last Name" />
      <input type="email" name="email" required placeholder="Email" />
      <input type="password" name="password" required placeholder="Password" />
      <small>
        <span>* </span>
        Password must be 8 or more characters
      </small>
      <button className="button normal" type="submit">
        Register
      </button>
      <Link to="/login">Already have an account? Login</Link>
    </form>
  );
}

export { Register };
