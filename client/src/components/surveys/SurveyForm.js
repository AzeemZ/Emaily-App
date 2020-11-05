import React from "react";
import { reduxForm, Field } from "redux-form";
import { Button } from "react-materialize";
import { Link } from "react-router-dom";

import SurveyField from "components/surveys/SurveyField";
import validateEmails from "utils/validateEmails";
import formFields from "components/surveys/formFields";

const SurveyForm = props => {
  const FieldList = formFields.map(({ name, label }) => (
    <Field
      key={name}
      name={name}
      type="text"
      label={label}
      component={SurveyField}
    />
  ));

  return (
    <form onSubmit={props.handleSubmit(props.onSubmit)}>
      {FieldList}
      <div style={{ marginTop: 40 }}>
        <Link to="/surveys" className="red btn-flat white-text">
          Cancel
        </Link>
        <Button className="right" waves="light">
          Next
          <i className="material-icons right">send</i>
        </Button>
      </div>
    </form>
  );
};

const validate = values => {
  const errors = {};

  errors.recipients = validateEmails(values.recipients || "");

  formFields.forEach(({ name }) => {
    if (!values[name] || !values[name].trim()) {
      errors[name] = `Please provide valid ${name}`;
    }
  });

  return errors;
};

export default reduxForm({
  form: "survey",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(SurveyForm);
