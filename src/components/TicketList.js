import { TicketItem } from "./TicketItem";

function TicketList(props) {
  return (
    <div className={`card shadow-${props.variant}`}>
      <div className={`card-header ${props.variant}`}>
        <h3>{props.title}</h3>
      </div>
      <ul className="card-body">
        {props.data.length === 0 ? (
          <h5>{props.nodata}</h5>
        ) : (
          props.data.map((item, index) => (
            <TicketItem key={index} data={item} />
          ))
        )}
      </ul>
    </div>
  );
}

export { TicketList };
