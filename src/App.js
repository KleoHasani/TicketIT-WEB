import { Fragment } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";

import { Navigation } from "./components/Navigation";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

import { Dashboard } from "./views/Dashboard";
import { Projects } from "./views/Projects";
import { Teams } from "./views/Teams";
import { Account } from "./views/Account";

function App() {
  const isAuth = useSelector((state) => state.auth);
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          {isAuth ? (
          <Fragment>
            <Navigation />
            <Route path="/dashboard" exact>
              <Dashboard />
            </Route>
            <Route path="/projects" exact>
              <Projects />
            </Route>
            <Route path="/teams" exact>
              <Teams />
            </Route>
            <Route path="/account" exact>
              <Account />
            </Route>
          </Fragment>
          ) : <Redirect to="/" exact />}
          
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;