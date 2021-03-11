import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import axios from "axios";
import { refresh } from "./helpers/refresh";

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
  const [requests, setRequests] = useState([]);
  const [team, setTeam] = useState([]);

  const handleAccept = (acceptID) => {
    axios({
      method: "patch",
      baseURL: "http://localhost:8000/api",
      url: `/user/request/accept/${acceptID}`,
      headers: { authorization: sessionStorage.getItem("authorization") },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          const m_update = requests.filter((req) => req._id !== acceptID);
          setRequests(m_update);
          setTeam([...team, acceptID]);
        } else {
          alert(response.data.msg);
        }
      })
      .catch((err) => {
        if (
          err.toString() === "Error: Request failed with status code 401" &&
          isAuth
        ) {
          const shouldRefresh = refresh();
          if (shouldRefresh) return handleAccept(acceptID);
        }
      });
  };

  const handleReject = (rejectID) => {
    axios({
      method: "patch",
      baseURL: "http://localhost:8000/api",
      url: `/user/request/reject/${rejectID}`,
      headers: { authorization: sessionStorage.getItem("authorization") },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          const m_update = requests.filter((req) => req._id !== rejectID);
          setRequests(m_update);
        }
      })
      .catch((err) => {
        if (
          err.toString() === "Error: Request failed with status code 401" &&
          isAuth
        ) {
          const shouldRefresh = refresh();
          if (shouldRefresh) return handleReject(rejectID);
        }
      });
  };

  useEffect(() => {}, [isAuth]);
  useEffect(() => {
    const getRequests = () => {
      axios({
        method: "get",
        baseURL: "http://localhost:8000/api",
        url: "/user/requests/",
        headers: { authorization: sessionStorage.getItem("authorization") },
      })
        .then((response) => {
          if (response.data.desc === "PASS") {
            setRequests(response.data.data);
          }
        })
        .catch((err) => {
          if (err.toString() === "Error: Request failed with status code 401") {
            const shouldRefresh = refresh();
            if (shouldRefresh) return getRequests();
          }
        });
    };
    if (isAuth) getRequests();
  }, [requests.length, isAuth]);

  useEffect(() => {
    const getTeam = () => {
      axios({
        method: "get",
        baseURL: "http://localhost:8000/api",
        url: "/user/team",
        headers: { authorization: sessionStorage.getItem("authorization") },
      })
        .then((response) => {
          if (response.data.desc === "PASS") {
            setTeam(response.data.data);
          }
        })
        .catch((err) => {
          if (
            err.toString() === "Error: Request failed with status code 401" &&
            isAuth
          ) {
            const shouldRefresh = refresh();
            if (shouldRefresh) return getTeam();
          }
        });
    };
    if (isAuth) getTeam();
  }, [team.length, isAuth]);

  return (
    <div className="app-container">
      <Router>
        {isAuth ? <Navigation requestsCount={requests.length} /> : null}
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
                  <Team
                    requests={requests}
                    team={team}
                    handleAccept={handleAccept}
                    handleReject={handleReject}
                  />
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
