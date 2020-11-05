import React from "react";
import { TextInput } from "react-materialize";

const SurveyField = ({ input, label, type, meta: { touched, error } }) => {
  return (
    <div className="input-field col" style={{ marginTop: 50 }}>
      <TextInput {...input} type={type} label={label} autoComplete="off" />
      {touched && error && <div className="red-text">{error}</div>}
    </div>
  );
};

export default SurveyField;
