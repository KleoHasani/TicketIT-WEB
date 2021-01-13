import { Fragment } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Navigation } from "./components/Navigation";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

import { Projects } from "./views/Projects";
import { Project } from "./views/Project";
import { Team } from "./views/Team";
import { Account } from "./views/Account";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          {isAuth ? (
            <Fragment>
              <Navigation />
              <Route path="/projects" exact>
                <Projects />
              </Route>
              <Route path="/projects/:projectID" exact>
                <Project />
              </Route>
              <Route path="/team" exact>
                <Team />
              </Route>
              <Route path="/account" exact>
                <Account />
              </Route>
            </Fragment>
          ) : (
            <Fragment>
              <Redirect to="/login" exact />
            </Fragment>
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
