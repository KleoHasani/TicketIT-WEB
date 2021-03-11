function TeamItem(props) {
  const handleRemove = () => {};
  return (
    <div className="request-item">
      <p>
        <span>{props.user.firstname}</span>, {props.user.lastname}
      </p>
      <div>
        <button className="button danger" onClick={handleRemove}>
          &#65794;
        </button>
      </div>
    </div>
  );
}

export { TeamItem };
