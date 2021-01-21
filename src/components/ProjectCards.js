import { ProjectCard } from "./ProjectCard";

function ProjectCards(props) {
  return (
    <div className="container shadow-normal">
      {props.cards.map((data, index) => (
        <ProjectCard
          key={index}
          data={data}
          handleDelete={props.handleDeleteProject}
          handleRename={props.handleRenameProject}
        />
      ))}
    </div>
  );
}

export { ProjectCards };
