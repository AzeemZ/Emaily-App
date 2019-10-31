import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import authReducer from "reducers/auth";
import surveyReducer from "reducers/survey";

export default combineReducers({
  auth: authReducer,
  form: formReducer,
  surveys: surveyReducer
});
