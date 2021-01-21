function NewTicketOverlay(props) {
  const handleNewTicket = (e) => {
    e.preventDefault();
    //;
    const type = e.target.ttype.value;

    if (type === "") return;

    props.newTicket(e.target.name.value, type, e.target.content.value);
  };

  return (
    <div className="overlay">
      <div>
        <header>
          <h3>New Ticket</h3>
        </header>
        <form onSubmit={handleNewTicket}>
          <input
            type="text"
            name="name"
            id="name"
            required
            placeholder="Name"
          />

          <select placeholder="Ticket Type" name="ttype">
            <option value="">Ticket Type</option>
            <option value={0}>TODO</option>
            <option value={1}>BUG</option>
          </select>

          <textarea
            name="content"
            rows="5"
            placeholder="Content"
            spellCheck={true}
            maxLength={300}
          ></textarea>

          <div>
            <button className="button normal" type="submit">
              Create New
            </button>
            <button
              className="button warning"
              type="reset"
              onClick={props.toggle}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export { NewTicketOverlay };
