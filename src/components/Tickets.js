import axios from "axios";
import { useEffect, useState } from "react";
import { TicketList } from "./TicketList";

function Tickets(props) {
  const [tickets, setTickets] = useState([]);
  const [inprogress, setInProgress] = useState([]);
  const [complete, setComplete] = useState([]);

  const getTickets = () => {
    axios({
      method: "get",
      baseURL: "http://localhost:8000/api",
      url: `/projects/${props.projectID}/tickets`,
      headers: { authorization: sessionStorage.getItem("authorization") },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          console.log(response.data.data);
        } else {
          alert(response.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Get tickets data on load
  useEffect(getTickets, []);

  useEffect(() => {}, [tickets, inprogress, complete]);

  return (
    <div className="container">
      <TicketList
        title="Tickets"
        data={tickets}
        variant="normal"
        nodata="Oops, looks like there are no tickets!"
      />
      <TicketList
        title="In-Progress"
        data={inprogress}
        variant="warning"
        nodata="Oops, looks like there are no tickets in progress!"
      />
      <TicketList
        title="Complete"
        data={complete}
        variant="ok"
        nodata="Oops, looks like there are no tickets completed!"
      />
    </div>
  );
}

export { Tickets };
