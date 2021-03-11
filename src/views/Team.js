import { useState } from "react";
import axios from "axios";

import { refresh } from "../helpers/refresh";

import { ViewHeader } from "../components/ViewHeader";
import { ResultItem } from "../components/ResultItem";
import { RequestItem } from "../components/RequestItem";
import { TeamItem } from "../components/TeamItem";

function Team(props) {
  const [search, setSearch] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      method: "get",
      baseURL: "http://localhost:8000/api",
      url: `/user/search/${e.target.search.value}`,
      headers: { authorization: sessionStorage.getItem("authorization") },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          if (response.data.data.length > 0) setSearch(response.data.data);
          else alert("No users found with that first name!");
        }
      })
      .catch((err) => {
        if (err.toString() === "Error: Request failed with status code 401") {
          const shouldRefresh = refresh();
          if (shouldRefresh) return handleSubmit(e);
        }
      });
  };

  return (
    <div className="view">
      <ViewHeader title="Team">
        <form
          className="new-project"
          autoComplete="off"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            type="text"
            name="search"
            id="search"
            required
            placeholder="Search"
          />
          <button className="button ok" type="submit">
            Search
          </button>
        </form>
      </ViewHeader>
      {props.requests.length > 0 ? <h2>Requests:</h2> : null}
      <ul className="result-list">
        {props.requests.map((request, index) => (
          <li key={index}>
            <RequestItem
              user={request}
              handleAccept={props.handleAccept}
              handleReject={props.handleReject}
            />
          </li>
        ))}
      </ul>

      {props.team.length > 0 ? <h2>Team:</h2> : null}
      <ul className="result-list">
        {props.team.map((teamate, index) => (
          <li key={index}>
            <TeamItem user={teamate} />
          </li>
        ))}
      </ul>

      {search.length > 0 ? <h2>Search:</h2> : null}
      <ul className="result-list">
        {search.map((user, index) => (
          <li key={index}>
            <ResultItem
              user={user}
              showAdd={
                !props.requests.find((request) => request._id === user._id) &&
                !props.team.find((teamate) => teamate._id === user._id)
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export { Team };
