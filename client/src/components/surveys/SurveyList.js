import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchSurveys } from "actions";

const SurveyList = ({ surveys, fetchSurveys }) => {
  useEffect(() => {
    fetchSurveys();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const listOfSurveys = () => {
    if (!surveys) {
      return;
    } else if (!surveys.length) {
      return (
        <h5 style={{ marginTop: 40 }}>
          You have not created any surveys yet. Would you like to{" "}
          <Link to="/surveys/new">create one</Link>?
        </h5>
      );
    } else {
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
    }
  };

  return <div>{listOfSurveys()}</div>;
};

const mapStateToProps = ({ surveys }) => {
  return { surveys };
};

export default connect(
  mapStateToProps,
  { fetchSurveys }
)(SurveyList);
