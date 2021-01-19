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
          props.data.map((item, index) => <li key={index}>{item}</li>)
        )}
      </ul>
    </div>
  );
}

export { TicketList };
