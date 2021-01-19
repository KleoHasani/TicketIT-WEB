import axios from "axios";

function refresh() {
  axios({
    method: "get",
    baseURL: "http://localhost:8000/api",
    url: "/auth/refresh-token",
    headers: { "x-refresh": sessionStorage.getItem("refresh") },
  })
    .then((response) => {
      if (response.data.desc === "PASS")
        sessionStorage.setItem(
          "authorization",
          response.headers["authorization"]
        );
    })
    .catch((err) => {
      window.sessionStorage.clear();
      window.localStorage.clear();
      window.location.reload();
    });
}

export { refresh };
