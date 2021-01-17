import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ViewHeader } from "../components/ViewHeader";
import { Error } from "../components/Error";

function Project(props) {
  const { projectID } = useParams();
  const [project, setProject] = useState([]);

  const [showError, setShowError] = useState(false);

  const onLoad = () => {
    axios({
      method: "get",
      baseURL: "http://localhost:8000/api",
      url: `/projects/${projectID}`,
      headers: { authorization: sessionStorage.getItem("authorization") },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          setProject(response.data.data);
        } else {
          alert(response.data.msg);
          setShowError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setShowError(true);
      });
  };

  useEffect(onLoad, [projectID]);

  if (showError) return <Error />;

  return (
    <div className="view">
      <ViewHeader title={project.name} />
      <div className="tickets">
        <div>
          <h3>Tickets</h3>
          <ul>
            <li>List</li>
            <li>List</li>
            <li>List</li>
          </ul>
        </div>
        <div>
          <h3>Assigned</h3>
          <ul>
            <li>List</li>
            <li>List</li>
            <li>List</li>
            <li>List</li>
            <li>List</li>
          </ul>
        </div>
        <div>
          <h3>Complete</h3>
          <ul>
            <li>List</li>
            <li>List</li>
            <li>List</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export { Project };
