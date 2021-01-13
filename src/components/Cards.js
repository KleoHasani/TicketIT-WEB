import { Card } from "./Card";

function Cards(props) {
  return (
    <div className="card-container">
      {props.cards.map((data, index) => (
        <Card
          key={index}
          data={data}
          handleDelete={props.handleDeleteProject}
          handleRename={props.handleRenameProject}
        />
      ))}
    </div>
  );
}

export { Cards };
