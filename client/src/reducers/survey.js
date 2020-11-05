import { FETCH_SURVEYS } from "actions/types";

export default (state = null, action) => {
  switch (action.type) {
    case FETCH_SURVEYS:
      return action.payload;

    default:
      return state;
  }
};
