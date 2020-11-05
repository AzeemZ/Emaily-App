import React, { useState } from "react";
import { reduxForm } from "redux-form";

import SurveyForm from "components/surveys/SurveyForm";
import SurveyFormReview from "components/surveys/SurveyFormReview";

const SurveyNew = () => {
  const [showFormReview, setShowFormReview] = useState(false);

  const renderContent = () => {
    if (showFormReview) {
      return <SurveyFormReview onCancel={() => setShowFormReview(false)} />;
    }

    return <SurveyForm onSubmit={() => setShowFormReview(true)} />;
  };

  return <div>{renderContent()}</div>;
};

export default reduxForm({ form: "survey" })(SurveyNew);
