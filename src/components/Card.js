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

  return (
    <div className="card">
      <div className="card-header">
        <h3>{props.data.name}</h3>
        <p>Created on: {dateParser(new Date(props.data.created))}</p>
      </div>
      <div className="card-body">
        <Link to={"/projects/" + props.data._id} className="button normal">
          View
        </Link>
        <div
          className="button warning"
          onClick={(e) => props.handleRename(e, props.data._id)}
        >
          Rename
        </div>
        <div
          className="button danger"
          onClick={(e) => props.handleDelete(e, props.data._id)}
        >
          Delete
        </div>
      </div>
    </div>
  );
}

export { Card };
