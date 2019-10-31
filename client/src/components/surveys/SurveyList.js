import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchSurveys } from "actions";

const SurveyList = ({ surveys, fetchSurveys }) => {
  useEffect(() => {
    fetchSurveys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const surveysList = () => {
    if (!surveys.length) {
      return;
    }

    return surveys.reverse().map(survey => (
      <div className="card darken-1">
        <div className="card-content">
          <span className="card-title">
            <strong>{survey.title}</strong>
          </span>
          <p>{survey.body}</p>
        </div>
        <div className="card-action">
          <a href="/surveys">YES: {survey.yes}</a>
          <a href="/surveys">NO: {survey.no}</a>
          <span className="right">
            <strong>Sent On:</strong>{" "}
            {new Date(survey.dateSent).toLocaleDateString()}
          </span>
        </div>
      </div>
    ));
  };

  return <div>{surveysList()}</div>;
};

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
