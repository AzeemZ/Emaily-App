import axios from "axios";
import { FETCH_USER } from "actions/types";

export const fetchUser = () => async dispatch => {
  const response = await axios.get("/api/current-user");

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const handleStripeToken = token => async dispatch => {
  const response = await axios.post("/api/stripe", token);

  dispatch({ type: FETCH_USER, payload: response.data });
};

export const submitSurvey = (formValues, history) => async dispatch => {
  const response = await axios.post("/api/surveys", formValues);

  dispatch({ type: FETCH_USER, payload: response.data });

  history.push("/surveys");
};
