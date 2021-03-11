function RequestItem(props) {
  return (
    <div className="request-item">
      <p>
        <span>{props.user.firstname}</span>, {props.user.lastname}
      </p>
      <div>
        <button
          className="button ok"
          onClick={() => props.handleAccept(props.user._id)}
        >
          &#10004;
        </button>
        <button
          className="button warning"
          onClick={() => props.handleReject(props.user._id)}
        >
          &#10005;
        </button>
      </div>
    </div>
  );
}

export { RequestItem };
