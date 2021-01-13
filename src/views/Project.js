import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ViewHeader } from "../components/ViewHeader";

function Project(props) {
  const { projectID } = useParams();
  const [project, setProject] = useState([]);

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
        } else alert(response.data.msg);
      })
      .catch((err) => {
        console.log(err);
        alert("Ooops, looks like something went wrong");
      });
  };

  useEffect(onLoad, []);

  console.log(project);

  return (
    <div className="view">
      <ViewHeader title={project.name} />
    </div>
  );
}

export { Project };
