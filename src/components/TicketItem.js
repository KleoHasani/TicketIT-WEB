import { dateParser } from "../helpers/parsers";

function TicketItem(props) {
  return (
    <p className="ticket-item">
      {props.data.name} - {dateParser(new Date(props.data.created))}
    </p>
  );
}

export { TicketItem };
