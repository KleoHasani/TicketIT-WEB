import { AUTH, UN_AUTH } from "../types/authTypes";

/**
 * @param {string} m_id
 */
const authAction = {
  type: AUTH,
  payload: true,
};

const unauthAction = {
  type: UN_AUTH,
  payload: false,
};

export { authAction, unauthAction };
