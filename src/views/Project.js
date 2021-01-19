import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ViewHeader } from "../components/ViewHeader";
import { Tickets } from "../components/Tickets";

import { Error } from "../components/Error";

function Project() {
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
      <Tickets projectID={projectID} />
    </div>
  );
}

export { Project };
