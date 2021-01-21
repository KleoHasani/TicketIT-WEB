import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ViewHeader } from "../components/ViewHeader";
import { TicketList } from "../components/TicketList";
import { NewTicketOverlay } from "../components/NewTicketOverlay";
import { Error } from "../components/Error";

import { refresh } from "../helpers/refresh";
import { TICKET_STATUS } from "../helpers/types";

function Project() {
  const { projectID } = useParams();

  const [showOverlay, setShowOverlay] = useState(false);

  const [project, setProject] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [inprogress, setInProgress] = useState([]);
  const [complete, setComplete] = useState([]);

  const sortTicketsByStatus = (tickets = []) => {
    const ticketsData = [];
    const inProgressData = [];
    const completeData = [];
    tickets.forEach((ticket) => {
      switch (ticket.tstatus) {
        case TICKET_STATUS.TICKET:
          ticketsData.push(ticket);
          break;
        case TICKET_STATUS.INPROGRESS:
          inProgressData.push(ticket);
          break;
        case TICKET_STATUS.COMPLETE:
          completeData.push(ticket);
          break;
        default:
          ticketsData.push(ticket);
          break;
      }
    });
    setTickets(ticketsData);
    setInProgress(inProgressData);
    setComplete(completeData);
  };

  useEffect(() => {
    const getTickets = () => {
      axios({
        method: "get",
        baseURL: "http://localhost:8000/api",
        url: `/projects/${projectID}/tickets`,
        headers: { authorization: sessionStorage.getItem("authorization") },
      })
        .then((response) => {
          if (response.data.desc === "PASS") {
            sortTicketsByStatus(response.data.data);
          }
        })
        .catch((err) => {
          throw err;
        });
    };
    const onLoad = () => {
      axios({
        method: "get",
        baseURL: "http://localhost:8000/api",
        url: `/projects/${projectID}`,
        headers: { authorization: sessionStorage.getItem("authorization") },
      })
        .then((response) => {
          if (response.data.desc === "PASS") {
            setProject(response.data.data);
            getTickets();
          } else {
            throw new Error("Error: Request failed with status code 401");
          }
        })
        .catch((err) => {
          if (err.toString() === "Error: Request failed with status code 401") {
            refresh();
            return onLoad();
          }
        });
    };
    onLoad();
  }, [projectID]);

  // Create new ticket
  const createNewTicket = (name, ttype, content) => {
    axios({
      method: "post",
      baseURL: "http://localhost:8000/api",
      url: `/projects/${projectID}/tickets/new`,
      headers: { authorization: sessionStorage.getItem("authorization") },
      data: {
        name: name,
        ttype: ttype,
        content: content,
      },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          setTickets([...tickets, response.data.data]);
          setShowOverlay(false);
        }
      })
      .catch((err) => {
        if (err.toString() === "Error: Request failed with status code 401") {
          refresh();
          return createNewTicket(name, ttype, content);
        }
      });
  };

  // Handle Create new ticket
  const handleToggleNewTicket = (e) => {
    e.preventDefault();
    setShowOverlay(!showOverlay);
    //createNewTicket();
  };

  // Handle Create new ticket
  const handleCreateNewTicket = (name, ttype, content) => {
    createNewTicket(name, ttype, content);
  };

  useEffect(() => {}, [tickets, inprogress, complete]);

  if (showOverlay)
    return (
      <NewTicketOverlay
        newTicket={handleCreateNewTicket}
        toggle={handleToggleNewTicket}
      />
    );

  return (
    <div className="view">
      <ViewHeader title={project.name}>
        <div className="button ok" onClick={handleToggleNewTicket}>
          New Ticket
        </div>
      </ViewHeader>
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
    </div>
  );
}

export { Project };
