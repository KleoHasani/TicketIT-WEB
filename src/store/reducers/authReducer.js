import { AUTH, UN_AUTH } from "../types/authTypes";

function authReducer(state = { isAuth: false, id: null }, action) {
  switch (action.type) {
    case AUTH:
      return action.payload;
    case UN_AUTH:
      return action.payload;
    default:
      return state;
  }
}

export { authReducer };
