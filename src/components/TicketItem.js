import { dateParser } from "../helpers/parsers";
import { IoTrashBinOutline, IoPencilOutline } from "react-icons/io5/index";
import { Fragment } from "react";

function TicketItem(props) {
  return (
    <Fragment>
      <div className="ticket-item">
        <p>
          {props.data.name} - {dateParser(new Date(props.data.created))}
        </p>
        <div>
          <div className="button warning">
            <IoPencilOutline className="icon-sm" />
          </div>
          <div className="button danger">
            <IoTrashBinOutline className="icon-sm" />
          </div>
        </div>
      </div>
      <hr />
    </Fragment>
  );
}

export { TicketItem };
