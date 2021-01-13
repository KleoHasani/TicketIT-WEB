import { AUTH, UN_AUTH } from "../types/authTypes";

/**
 * @param {string} m_id
 */
const authAction = (m_id) => {
  return {
    type: AUTH,
    payload: {
      isAuth: true,
      id: m_id,
    },
  };
};

const unauthAction = {
  type: UN_AUTH,
  payload: false,
};

export { authAction, unauthAction };
