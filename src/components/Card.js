import { Link } from "react-router-dom";

function Card(props) {
  const dateParser = (date) => {
    const hours = date.getHours();
    return `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()} at: ${hours}:${date.getMinutes()} ${
      hours > 12 ? "PM" : "AM"
    }`;
  };

  console.log(props.key);
  return (
    <div className="project-card">
      <div className="project-card-header">
        <h2>{props.data.name}</h2>
        <p>Created on: {dateParser(new Date(props.data.created))}</p>
      </div>
      <hr />
      <div className="project-card-body">
        <Link to={"/projects/" + props.data._id} className="button-link">
          View
        </Link>
        <button
          onClick={(e) => props.handleRename(e, props.data._id)}
          className="button-warning"
        >
          Rename
        </button>
        <button
          onClick={(e) => props.handleDelete(e, props.data._id)}
          className="button-danger"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export { Card };
