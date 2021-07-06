import { SET_ALERT, REMOVE_ALERT } from "../actions/types.action";

const initialState = [];

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_ALERT:
      console.log(payload);
      return [...state, payload];
    case REMOVE_ALERT:
      console.log(payload);
      return state.filter((alert) => alert.id !== payload);

    default:
      return state;
  }
}
