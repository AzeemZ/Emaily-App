import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import formFields from "components/surveys/formFields";
import { submitSurvey } from "actions";

const SurveyFormReview = ({ formValues, onCancel, history, submitSurvey }) => {
  const ReviewFields = formFields.map(({ name, label }) => (
    <li className="collection-item" key={name}>
      <h5>{label}:</h5>
      <div>{formValues[name]}</div>
    </li>
  ));

  return (
    <div>
      <h4>Please confirm your entries</h4>

      <ul className="collection">{ReviewFields}</ul>

      <div style={{ marginTop: 25 }}>
        <button
          className="yellow darken-3 btn-flat white-text"
          onClick={onCancel}
        >
          Back
        </button>
        <button
          className="green right btn-flat white-text"
          onClick={() => submitSurvey(formValues, history)}
        >
          Send Survey
          <i className="material-icons right">email</i>
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { formValues: state.form.survey.values };
};

export default connect(
  mapStateToProps,
  { submitSurvey }
)(withRouter(SurveyFormReview));
