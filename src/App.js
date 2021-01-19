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
import { Error } from "./components/Error";

import { Projects } from "./views/Projects";
import { Project } from "./views/Project";
import { Team } from "./views/Team";
import { Account } from "./views/Account";

function App() {
  const isAuth = useSelector((state) => state.auth);

  return (
    <div className="app-container">
      <Router>
        {isAuth ? <Navigation /> : null}
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register" exact>
            <Register />
          </Route>
          {isAuth ? (
            <Fragment>
              <Switch>
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
                <Route>
                  <Error />
                </Route>
              </Switch>
            </Fragment>
          ) : (
            <Redirect to="/login" />
          )}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
