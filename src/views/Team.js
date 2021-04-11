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
    if (e.target.value !== "")
      axios({
        method: "get",
        baseURL: "http://localhost:8000/api",
        url: `/user/search/${e.target.value}`,
        headers: { authorization: sessionStorage.getItem("authorization") },
      })
        .then((response) => {
          if (response.data.desc === "PASS") {
            if (response.data.data.length > 0) setSearch(response.data.data);
            else setSearch([]);
          }
        })
        .catch((err) => {
          if (err.toString() === "Error: Request failed with status code 401") {
            const shouldRefresh = refresh();
            if (shouldRefresh) return handleSubmit(e);
          }
        });
    else setSearch([]);
  };

  return (
    <div className="view">
      <ViewHeader title="Team">
        <input
          className="search-box"
          type="text"
          required
          placeholder="Search"
          onChange={(e) => handleSubmit(e)}
        />
      </ViewHeader>
      <h2>Requests:</h2>
      {props.requests.length > 0 ? (
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
      ) : (
        <h3 className="container">No new requests!</h3>
      )}

      <hr />
      <h2>Team Members:</h2>
      {props.team.length > 0 ? (
        <ul className="result-list">
          {props.team.map((teamate, index) => (
            <li key={index}>
              <TeamItem user={teamate} />
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="container">No team members!</h3>
      )}

      {search.length > 0 ? (
        <div>
          <hr />
          <h2>Search:</h2>
        </div>
      ) : null}
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
