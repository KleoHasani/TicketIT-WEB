import { ViewHeader } from "../components/ViewHeader";
import { Cards } from "../components/Cards";
import { useEffect, useState } from "react";
import axios from "axios";
import { refresh } from "../helpers/refresh";

function Projects() {
  const [projects, setProjects] = useState([]);

  // Load once
  useEffect(() => {
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
          if (err.toString() === "Error: Request failed with status code 401") {
            const shouldRefresh = refresh();
            if (shouldRefresh) return onLoad();
          }
        });
    };
    onLoad();
  }, []);

  // Create new project
  const handleCreateNewProject = (e) => {
    e.preventDefault();
    const name = e.target.project.value;
    axios({
      method: "post",
      baseURL: "http://localhost:8000/api",
      url: "/projects/new",
      headers: { authorization: sessionStorage.getItem("authorization") },
      data: {
        project: name,
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
        if (err.toString() === "Error: Request failed with status code 401") {
          refresh();
          return handleCreateNewProject(e);
        } else {
          alert(err);
          e.target.project.value = "";
        }
      });
  };

  // Rename project
  const renameProject = (rename, projectID) => {
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
        } else return false;
      })
      .catch((err) => {
        if (err.toString() === "Error: Request failed with status code 401") {
          refresh();
          return renameProject(rename, projectID);
        }
      });
  };

  // Handle Rename project
  const handleRenameProject = (e, projectID) => {
    e.preventDefault();
    const rename = prompt("Rename to: ");
    if (rename !== null) renameProject(rename, projectID);
    return;
  };

  // Delete project
  const deleteProject = (projectID) => {
    axios({
      method: "delete",
      baseURL: "http://localhost:8000/api",
      url: `/projects/${projectID}/delete`,
      headers: { authorization: sessionStorage.getItem("authorization") },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          setProjects(projects.filter((project) => project._id !== projectID));
        } else alert(response.data.msg);
      })
      .catch((err) => {
        if (err.toString() === "Error: Request failed with status code 401") {
          refresh();
          return deleteProject(projectID);
        }
      });
  };

  // Handle Delete project
  const handleDeleteProject = (e, projectID) => {
    e.preventDefault();
    if (global.confirm("Are you sure?")) deleteProject(projectID);
    return;
  };

  return (
    <div className="view">
      <ViewHeader title="Projects">
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
          <button className="button ok" type="submit">
            New
          </button>
        </form>
      </ViewHeader>

      <Cards
        cards={projects}
        handleDeleteProject={handleDeleteProject}
        handleRenameProject={handleRenameProject}
      />
    </div>
  );
}

export { Projects };
