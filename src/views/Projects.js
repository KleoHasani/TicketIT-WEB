import { ViewHeader } from "../components/ViewHeader";
import { Cards } from "../components/Cards";
import { useEffect, useState } from "react";
import axios from "axios";

function Projects(props) {
  const [projects, setProjects] = useState([]);

  const onLoad = () => {
    axios({
      method: "get",
      baseURL: "http://localhost:8000/api",
      url: "/projects/",
      headers: { authorization: sessionStorage.getItem("authorization") },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          setProjects(response.data.data);
        } else alert(response.data.msg);
      })
      .catch((err) => {
        console.log(err);
        alert("Ooops, looks like something went wrong");
      });
  };

  // Load once
  useEffect(onLoad, []);

  // Update renderer based on project

  const handleCreateNewProject = (e) => {
    e.preventDefault();
    axios({
      method: "post",
      baseURL: "http://localhost:8000/api",
      url: "/projects/new",
      headers: { authorization: sessionStorage.getItem("authorization") },
      data: {
        project: e.target.project.value,
      },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          // Render side data
          setProjects([...projects, response.data.data]);
          e.target.project.value = "";
        } else alert(response.data.msg);
      })
      .catch((err) => {
        console.log(err);
        alert("Ooops, looks like something went wrong");
      });
  };

  const handleRenameProject = (e, projectID) => {
    e.preventDefault();
    const rename = prompt("Rename to: ");

    if (rename !== null)
      axios({
        method: "patch",
        baseURL: "http://localhost:8000/api",
        url: `/projects/${projectID}/update/name`,
        headers: { authorization: sessionStorage.getItem("authorization") },
        data: {
          project: rename,
        },
      })
        .then((response) => {
          if (response.data.desc === "PASS") {
            projects.forEach((project) => {
              if (project._id === projectID) project.name = rename;
            });
            setProjects([...projects]);
          } else alert(response.data.msg);
        })
        .catch((err) => {
          console.log(err);
          alert("Ooops, looks like something went wrong");
        });
    return;
  };

  const handleDeleteProject = (e, projectID) => {
    e.preventDefault();
    if (global.confirm("Are you sure?"))
      axios({
        method: "delete",
        baseURL: "http://localhost:8000/api",
        url: `/projects/${projectID}/delete`,
        headers: { authorization: sessionStorage.getItem("authorization") },
      })
        .then((response) => {
          if (response.data.desc === "PASS") {
            setProjects(
              projects.filter((project) => project._id !== projectID)
            );
          } else alert(response.data.msg);
        })
        .catch((err) => {
          console.log(err);
          alert("Ooops, looks like something went wrong");
        });
    return;
  };

  return (
    <div className="view">
      <ViewHeader title="Projects" />
      <form
        className="new-project"
        autoComplete="off"
        onSubmit={handleCreateNewProject}
      >
        <input
          type="text"
          name="project"
          id="project"
          required
          placeholder="Project Name"
        />
        <button>New</button>
      </form>
      <Cards
        cards={projects}
        handleDeleteProject={handleDeleteProject}
        handleRenameProject={handleRenameProject}
      />
    </div>
  );
}

export { Projects };
