import axios from "axios";
import { refresh } from "../helpers/refresh";

function ResultItem(props) {
  const handleAdd = () => {
    axios({
      method: "post",
      baseURL: "http://localhost:8000/api",
      url: "/user/request/",
      headers: { authorization: sessionStorage.getItem("authorization") },
      data: { toUser: props.user._id },
    })
      .then((response) => {
        if (response.data.desc === "PASS") {
          console.log(response);
        } else {
          alert(response.data.msg);
        }
      })
      .catch((err) => {
        if (err.toString() === "Error: Request failed with status code 401") {
          const shouldRefresh = refresh();
          if (shouldRefresh) return handleAdd();
        }
      });
  };

  return (
    <div className="result-item">
      <p>
        <span>{props.user.firstname}</span>, {props.user.lastname}
      </p>
      <div>
        {props.showAdd ? (
          <button className="button ok" onClick={handleAdd}>
            Add
          </button>
        ) : null}
      </div>
    </div>
  );
}

export { ResultItem };
